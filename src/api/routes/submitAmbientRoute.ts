import axios from "axios";
import express from "express";
import { newApiKeyEvent } from "../../db/connect.js";
import { AmbientDataModel, AmbientModel } from "../../db/models/ambient_schema.js";
import { getUserByAddress } from "../../db/models/users-schema.js";

const router = express.Router();

router.post("/api/submitAmbientKey", async function (req, res) {
  try {
    const data = req.body;
    console.log("data:", data);

    const existingKey = await AmbientModel.exists({ api_key: data.key });

    if (existingKey) {
      console.log("existingKey:", existingKey);
      return res.status(409).send({
        message: "Key already exists in database.",
        status: "ERROR"
      });
    }

    try {
      const response = await axios.get(
        `https://rt.ambientweather.net/v1/devices?applicationKey=${data.appKey}&apiKey=${data.key}`
      );
      console.log(response.data,'response___________')

      const user = await getUserByAddress(data.address);

      const devices = response.data.map((device: any) => ({
        macAddress: device.macAddress,
        info: device.info || {},
        lastData: device.lastData || {}
      }));

      const ambientAccount = new AmbientModel({
        api_key: data.key,
        app_key: data.appKey,
        user_id: user._id,
        address: data.address,
        timestamp: new Date(),
        devices: devices
      });

      await ambientAccount.save();
      newApiKeyEvent.emit("newApiKey", ambientAccount._id);

      res.status(200).send({
        message: "Successfully linked your API Key to your wallet address! We will soon begin to retrieve data from your Ambient stations/devices.",
        status: "SUCCESS"
      });
    } catch (e) {
      console.log("API check error:", e);
      return res.status(400).send({
        message: "Key is invalid. (Didn't pass API check)",
        status: "ERROR"
      });
    }
  } catch (e) {
    console.log("error:", e);
    res.status(500).send({
      message: "Internal server error.",
      status: "ERROR"
    });
  }
});

async function fetchAmbientDataDynamically() {
  try {
    const accounts = await AmbientModel.find();

    for (const account of accounts) {
      const { api_key, app_key } = account;

      try {
        const response = await axios.get(
          `https://rt.ambientweather.net/v1/devices?applicationKey=${app_key}&apiKey=${api_key}`
        );

        const devices = response.data.map((device: any) => ({
          macAddress: device.macAddress,
          info: device.info || {},
          lastData: device.lastData || {}
        }));

        await AmbientModel.findOneAndUpdate(
          { api_key },
          { devices, timestamp: new Date() }
        );

        console.log(`Updated devices for API Key: ${api_key}`);

        for (const device of devices) {
          if (device.lastData) {
            // Check if data has changed
            const latestData = await AmbientDataModel.findOne({
              macAddress: device.macAddress
            }).sort({ createdAt: -1 });

            if (!latestData || JSON.stringify(latestData.data) !== JSON.stringify(device.lastData)) {
              const ambientData = new AmbientDataModel({
                macAddress: device.macAddress,
                data: device.lastData
              });

              await ambientData.save();
              console.log(`Saved new data for device: ${device.macAddress}`);
            } else {
              console.log(`No changes detected for device: ${device.macAddress}`);
            }
          }
        }
      } catch (error) {
        console.error(`Error fetching devices for API Key: ${api_key}`, error);
      }
    }
  } catch (error) {
    console.error("Error fetching or updating Ambient data:", error);
  }
}

// Set interval for periodic data fetching (every 10 minutes)
setInterval(fetchAmbientDataDynamically, 10 * 60 * 1000);

export default router;
