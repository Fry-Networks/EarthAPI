import mongoose, { mongo } from 'mongoose';


const BaseSoilSchema = new mongoose.Schema({
  devices:[String],
  timestamp: Date,
  metadata: {
    data_type: String,
    deviceMAC: String,
    location: {
      lat: Number,
      lon: Number,
      altitude: Number
    }
  },
},
  {
    timeseries: {
      timeField: 'timestamp',
      metaField: 'metadata',
      granularity: 'hours',
    }
  }
);

export interface BaseSoilData extends mongoose.Document {
  timestamp: Date;
  metadata: {
    type: String;
    deviceMAC: String;
    location: {
      lat: Number;
      lon: Number;
      altitude?: Number
    };
  };

}

export const BaseSoilModel = mongoose.model<BaseSoilData>('soil_accounts', BaseSoilSchema);

const AmbientDataSchema = new mongoose.Schema({

});

export const AmbientDataModel = BaseSoilModel.discriminator('ambient_data', AmbientDataSchema);

export interface AmbientData extends BaseSoilData {
  devices: [BaseSoilData]
}

const EcowittDataSchema = new mongoose.Schema({
  soil_ch1: {
    soilmoisture: {
      time: { type: Number, required: false },
      unit: { type: String, required: false },
      value: { type: Number, required: false }
    }
  },
  soil_ch2: {
    soilmoisture: {
      time: { type: Number, required: false },
      unit: { type: String, required: false },
      value: { type: Number, required: false }
    }
  },
  soil_ch3: {
    soilmoisture: {
      time: { type: Number, required: false },
      unit: { type: String, required: false },
      value: { type: Number, required: false }
    }
  },
  soil_ch4: {
    soilmoisture: {
      time: { type: Number, required: false },
      unit: { type: String, required: false },
      value: { type: Number, required: false }
    }
  },
  soil_ch5: {
    soilmoisture: {
      time: { type: Number, required: false },
      unit: { type: String, required: false },
      value: { type: Number, required: false }
    }
  },
  soil_ch6: {
    soilmoisture: {
      time: { type: Number, required: false },
      unit: { type: String, required: false },
      value: { type: Number, required: false }
    }
  },
  soil_ch7: {
    soilmoisture: {
      time: { type: Number, required: false },
      unit: { type: String, required: false },
      value: { type: Number, required: false }
    }
  },
  soil_ch8: {
    soilmoisture: {
      time: { type: Number, required: false },
      unit: { type: String, required: false },
      value: { type: Number, required: false }
    }
  },
  soilmoisture_sensor_ch4: {
    time: { type: Number, required: false },
    unit: { type: String, required: false },
    value: { type: Number, required: false }
  },
  soilmoisture_sensor_ch5: {
    time: { type: Number, required: false },
    unit: { type: String, required: false },
    value: { type: Number, required: false }
  },
  soilmoisture_sensor_ch6: {
    time: { type: Number, required: false },
    unit: { type: String, required: false },
    value: { type: Number, required: false }
  },
  soilmoisture_sensor_ch7: {
    time: { type: Number, required: false },
    unit: { type: String, required: false },
    value: { type: Number, required: false }
  },
  soilmoisture_sensor_ch8: {
    time: { type: Number, required: false },
    unit: { type: String, required: false },
    value: { type: Number, required: false }
  }
});

export const EcowittDataModel = BaseSoilModel.discriminator('ecowitt_data', EcowittDataSchema);

export interface EcowittData extends BaseSoilData {

}

// interface SensorStats {
//     pm2_5: number;
//     pm2_5_10minute: number;
//     pm2_5_30minute: number;
//     pm2_5_60minute: number;
//     pm2_5_6hour: number;
//     pm2_5_24hour: number;
//     pm2_5_1week: number;
//     time_stamp: number;
// }
