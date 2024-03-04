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
export const SoilAccountsModel = mongoose.model('soil_accounts', SoilAccountSchema);


export interface AirAccount extends mongoose.Document {
  user_id: mongoose.Schema.Types.ObjectId | string;
  timestamp: Date;
  api_type: API_TYPE;
  info: String;
  devices?: Array<any>;
}
const PurpleAirSchema = new mongoose.Schema({
  read_key: { type: String, required: true },
  sensor: { type: String, required: true }
});
/* export const PurpleAirModel = SoilAccountsModel.discriminator('purpleAir_acc', PurpleAirSchema); */

const AmbientSchema = new mongoose.Schema({
  api_key: { type: String, required: true },
});

export const AmbientModel = SoilAccountsModel.discriminator('ambient_acc', AmbientSchema);

const EcowittSchema = new mongoose.Schema({
  api_key: { type: String, required: true },
});

export const EcowittModel = SoilAccountsModel.discriminator('ecowitt_acc', EcowittSchema);

export interface AmbientAccount extends AirAccount {
  api_type: "ambient";
  api_key: string;
}

export interface EcowittAccount extends AirAccount {
  api_type: "ecowitt";
  api_key: string;
  app_key: string;
}

type API_TYPE = "ambient" | "ecowitt";

export default SoilAccountSchema;