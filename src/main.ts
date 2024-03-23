// imports
import { startApi } from "./api/api.js";
import { newApiKeyEvent } from "./db/connect.js";
import ambient from "ambient-weather-api";
import { SoilAccountModel, AmbientAccount, AmbientModel, EcowittAccount, EcowittModel } from "./db/models/soil_accounts.js";

import { createClientForAmbientKey } from "./devices/ambient.js";
import { createClientForEcoWittKey } from "./devices/ecowitt.js";

const ecowittClients: Map<string, string> = new Map();
const ambientClients: Map<string, ambient> = new Map();

// main function

const startApp = async () => {
    console.log("startApp")
    await startApi();
    
    // Handling for Ambient-Weather devices
    const ambientApiKeys: AmbientAccount[] = await SoilAccountModel.find({ api_type: "ambient" });
    for (let account of ambientApiKeys) {
        console.log("account", account)
        try {
            await createClientForAmbientKey(ambientClients, account._id);
        }
        catch (e: any) {
            console.log(`Error creating client for ambient key ${account.api_key} - ${e.stack}`);
        }
    }

    // Handling for EcoWitt devices
    const ecoapiKeys: EcowittAccount[] = await SoilAccountModel.find({ api_type: "ecowitt" });
    for (const account of ecoapiKeys) {
        console.log("account", account)
        try { 
            await createClientForEcoWittKey(ecowittClients, account._id);
        }
        catch (e: any) {
            console.log(`Error creating client for ecowitt key ${account.api_key} - ${e.stack}`);
        }
    }
}

startApp();