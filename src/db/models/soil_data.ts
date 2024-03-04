import mongoose, { mongo } from 'mongoose';

const BaseSoilSchema = new mongoose.Schema(
    {
        timestamp: Date,
        metadata: {
            data_type: String,
            deviceMAC: String,
            location: {
                lat: Number,
                lon: Number,
                altitude: { type: Number, required: false }
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
        type: string;
        deviceMAC: string;
        location: {
            lat: number;
            lon: number;
            altitude?: number
        };
    };

}

export const BaseSoilModel = mongoose.model<BaseSoilData>('soil', BaseSoilSchema);

const AmbientDataSchema = new mongoose.Schema({

});

export const AmbientDataModel = BaseSoilModel.discriminator('ambient_data', AmbientDataSchema);

export interface AmbientData extends BaseSoilData {
}

const EcowittDataSchema = new mongoose.Schema({
    soiltemp1f: {

    },
    soiltemp2f: {

    },
    soiltemp3f: {

    },
    soiltemp4f: {

    },
    soiltemp5f: {

    },
    soiltemp6f: {

    },
    soiltemp7f: {

    },
    soiltemp9f: {

    },
    soiltemp10f: {

    },
    soilhum1: {

    },
    soilhum2: {

    },
    soilhum3: {

    },
    soilhum4: {

    },
    soilhum5: {

    },
    soilhum6: {

    },
    soilhum7: {

    },
    soilhum8: {

    },
    soilhum9: {

    },
    soilhum10: {

    },
    soiltens1: {

    },
    soiltens2: {

    },
    soilten3: {

    },
    soilten4: {
    },
    battsm1 : {

    },
    battsm2: {

    },
    battsm3: {

    },
    battsm4: {
        
    }

});

export const EcowittDataModel = BaseSoilModel.discriminator('ecowitt_data', EcowittDataSchema);

export interface EcowittData extends BaseSoilData {
    soil_ch1: {
        soilmoisture: {
          time: number,
          unit: "%",
          value: number
        }
      },
      soil_ch2: {
        soilmoisture: {
          time: number,
          unit: "%",
          value: number
        }
      },
      soil_ch3: {
        soilmoisture: {
          time: number,
          unit: "%",
          value: number
        }
      },
      soil_ch4: {
        soilmoisture: {
          time: number,
          unit: "%",
          value: number
        }
      },
      soil_ch5: {
        soilmoisture: {
          time: number,
          unit: "%",
          value: number
        }
      },
      soil_ch6: {
        soilmoisture: {
          time: number,
          unit: "%",
          value: number
        }
      },
      soil_ch7: {
        soilmoisture: {
          time: number,
          unit: "%",
          value: number
        }
      },
      soil_ch8: {
        "soilmoisture": {
          time: number,
          unit: "%",
          value: number
        }
      },
}

interface SensorStats {
    pm2_5: number;
    pm2_5_10minute: number;
    pm2_5_30minute: number;
    pm2_5_60minute: number;
    pm2_5_6hour: number;
    pm2_5_24hour: number;
    pm2_5_1week: number;
    time_stamp: number;
}
