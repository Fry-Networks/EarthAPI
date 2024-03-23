// Ambient Miner File
import ambient, { Device } from "ambient-weather-api";
import { SoilAccountModel, AmbientAccount, AmbientModel } from "../db/models/soil_accounts.js";
import { AmbientDataModel } from "../db/models/soil_data.js";

const ambientApplicationKey = process.env.AW_APPLICATION_KEY!;

export const createClientForAmbientKey = async (ambientClients: Map<string, ambient>, ObjectId: string) => {
    if (ambientClients.has(ObjectId)) return;

    let accountData: AmbientAccount = (await AmbientModel.findById(ObjectId))!;
    // if (!accountData) { accountData = (await SoilAccountModel.findById(ObjectId))!; }
    const account: AmbientAccount = accountData.toObject();
    const client = new ambient({
        apiKey: account.api_key,
        applicationKey: ambientApplicationKey,
    });

    function getName(device: Device) {
        return device.info.name;
    }

    client.connect();
    client.on("connect", () => {
        console.log(`Connected to AmbientWeather with key ${account.api_key}`);
        client.subscribe(account.api_key);
    });
    //@ts-ignore
    client.on("error", console.error);
    client.on("subscribed", (data) => {
        console.log("subscribed data:",data)
        console.log("Subscribed to " + data.devices.length + " device(s): ");
        // log all the names of devices.
        console.log(data.devices.map(getName).join(", "));
        const toDb = data.devices.map((device) => {
            return {
                deviceMAC: device.macAddress,
                info: {
                    name: getName(device),
                    coords: {
                        "lat": device.info.coords.coords.lat,
                        "lon": device.info.coords.coords.lon,
                    }
                },
            };
        });
        // need to filter out devices without coords
        // const toDb = data.devices.filter(device => device.info.coords).map((device) => {
        //     console.log("device:!", device)
        //     return {
        //         deviceMAC: device.macAddress,
        //         info: {
        //             name: getName(device),
        //             coords: {
        //                 "lat": device.info.coords.coords.lat,
        //                 "lon": device.info.coords.coords.lon,
        //             }
        //         },
        //     };
        // });
        console.log("toDb", toDb)
        if (account.devices !== toDb) {
            accountData.devices = toDb;
            accountData.save();
        }
        console.log(`Created client for ambient key ${account.api_key}`);
    });
    client.on("data", (data) => {
        logAmbient(data);
    });

    ambientClients.set(ObjectId, client);
    return;
};

const logAmbient = async (data: any & { device: ambient.Device }) => {
    const toDb = new AmbientDataModel({
        timestamp: new Date(data.dateutc),
        soiltemp1f: data.device.soiltemp1f,
        soiltemp2f: data.device.soiltemp2f, 
        soiltemp3f: data.device.soiltemp3f,
        soiltemp4f: data.device.soiltemp4f,
        soiltemp5f: data.device.soiltemp5f,
        soiltemp6f: data.device.soiltemp6f,
        soiltemp7f: data.device.soiltemp7f,
        soiltemp8f: data.device.soiltemp8f,
        soiltemp9f: data.device.soiltemp9f,
        soiltemp10f: data.device.soiltemp10f,
        soilhum1: data.device.soilhum1,
        soilhum2: data.device.soilhum2,
        soilhum3: data.device.soilhum3,
        soilhum4: data.device.soilhum4,
        soilhum5: data.device.soilhum5,
        soilhum6: data.device.soilhum6,
        soilhum7: data.device.soilhum7,
        soilhum8: data.device.soilhum8,
        soilhum9: data.device.soilhum9,
        soilhum10: data.device.soilhum10,       
        soiltens1: data.device.soiltens1,
        soiltens2: data.device.soiltens2,
        soiltens3: data.device.soiltens3,
        soiltens4: data.device.soiltens4,
        metadata: {
            data_type: "ambient",
            deviceMAC: data.device.macAddress || "N/A",
            location: {
                lat: data.device.info?.coords?.coords?.lat,
                lon: data.device.info?.coords?.coords?.lon
            }
        }
    });

    await toDb.save();
};
