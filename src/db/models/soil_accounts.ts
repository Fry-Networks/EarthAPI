// imports
import mongoose, { mongo } from "mongoose";

// schema for soil accounts
const SoilAccountSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  timestamp: Date,
  api_type: String,
  devices: [String],
});

// exported model for Soil Accounts. 
export const SoilAccountModel = mongoose.model('soil_accounts', SoilAccountSchema);

export interface SoilAccount extends mongoose.Document {
  user_id: mongoose.Schema.Types.ObjectId | string;
  timestamp: Date;
  api_type: API_TYPE;
  info: String;
  devices?: Array<any>;
}

const AmbientSchema = new mongoose.Schema({
  api_key: { type: String, required: true },
});

export const AmbientModel = SoilAccountModel.discriminator('ambient_acc', AmbientSchema);

const EcowittSchema = new mongoose.Schema({
  api_key: { type: String, required: true },
});

export const EcowittModel = SoilAccountModel.discriminator('ecowitt_acc', EcowittSchema);

export interface AmbientAccount extends SoilAccount {
  api_type: "ambient";
  api_key: string;
}

export interface EcowittAccount extends SoilAccount {
  api_type: "ecowitt";
  api_key: string;
  app_key: string;
}

type API_TYPE = "ambient" | "ecowitt";

export default SoilAccountSchema;