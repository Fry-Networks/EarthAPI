import mongoose from "mongoose";

const coordsSchema = new mongoose.Schema({
  lat: Number,
  lon: Number
});

const infoSchema = new mongoose.Schema({
  name: String,
  coords: {
    coords: coordsSchema,
    address: String,
    location: String,
    elevation: Number,
    geo: {
      type: { type: String },
      coordinates: [Number]
    }
  }
});

const lastDataSchema = new mongoose.Schema({
  dateutc: Number,
  tempinf: Number,
  humidityin: Number,
  tempf: Number,
  humidity: Number,
  baromabsin: Number,
  baromrelin: Number,
  battout: Number,
  dewPoint: Number,
  feelsLikein: Number,
  dewPointin: Number,
  tz: String,
  date: Date
});

const ambientDeviceSchema = new mongoose.Schema({
  macAddress: { type: String },
  info: infoSchema,
  lastData: lastDataSchema
});

const ambientAccountSchema = new mongoose.Schema({
  api_key: { type: String },
  app_key: {type : String},
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  address: { type: String },
  timestamp: { type: Date, default: Date.now },
  api_type: { type: String, default: "ambient" },
  devices: [ambientDeviceSchema]
});

const ambientDataSchema = new mongoose.Schema({
  macAddress: { type: String },
  data: lastDataSchema
});

export const AmbientModel = mongoose.model("ambientAccounts", ambientAccountSchema);
export const AmbientDataModel = mongoose.model("ambientData", ambientDataSchema);