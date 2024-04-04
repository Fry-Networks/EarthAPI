// imports
import { StringValueNode } from "graphql";
import mongoose, { mongo } from "mongoose";

type API_TYPE = "ambient" | "ecowitt";

// schema for soil accounts
const SoilAccountSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  timestamp: Date,
  api_type: { type: String, enum: ["ambient", "ecowitt"] },
  devices:  Array<any>,
});


export interface SoilAccount extends mongoose.Document {
  user_id: mongoose.Schema.Types.ObjectId | string;
  timestamp: Date;
  api_type: API_TYPE;
  info: Object;
  devices?: Array<any>;
}

// exported model for Soil Accounts. 
export const SoilAccountModel = mongoose.model('soil_account', SoilAccountSchema);

const AmbientSchema = new mongoose.Schema({
  api_key: { type: String, required: true },
});

export const AmbientModel = SoilAccountModel.discriminator('ambient_acc', AmbientSchema);

const EcowittSchema = new mongoose.Schema({
  api_key: { type: String, required: true },
  app_key: { type: String, required: true },
});

export const EcowittModel = SoilAccountModel.discriminator<SoilAccount>('ecowitt_acc', EcowittSchema);

// export const EcowittModel = SoilAccountModel.discriminator('ecowitt_acc', EcowittSchema);

export interface AmbientAccount extends SoilAccount {
  api_type: "ambient";
  api_key: string;
  deviceMAC: string;
  info: {
    name: string;
    coords: {
      lat: number;
      lon: number;
    }
  }
}

export interface EcowittAccount extends SoilAccount {
  api_type: "ecowitt";
  api_key: string;
  app_key: string;
  mac: string;
}

export default SoilAccountSchema;