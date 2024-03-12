export interface EcoWittDevice {
  id: number;
  name: string;
  mac: string;
  imei: string;
  type: number;
  data_zone_id: string;
  createtime: number;
  longitude: number;
  latitude: number;
  stationtype: string;
}

export interface EcoWittDevicesResponse {
  code: 0;
  msg: string;
  time: string;
  data: {
    total: number;
    totalPage: number;
    list: EcoWittDevice[];
  };
}

export interface EcoWittDeviceData {
  code: 0;
  msg: string;
  time: string;
  data: Data;
}

export interface Data {
  code: 0;
  msg: string;
  time: string;
  soil_ch1: SoilCh1;
  soil_ch2: SoilCh2;
  soil_ch3: SoilCh3;
  soil_ch4: SoilCh4;
  soil_ch5: SoilCh5;
  soil_ch6: SoilCh6;
  soil_ch7: SoilCh7;
  soil_ch8: SoilCh8;
  soilmoisture_sensor_ch4: { soilmoisture:Soilmoisture },
  soilmoisture_sensor_ch5: { soilmoisture: Soilmoisture },
  soilmoisture_sensor_ch6: { soilmoisture: Soilmoisture },
  soilmoisture_sensor_ch7: { soilmoisture: Soilmoisture },
  soilmoisture_sensor_ch8: { soilmoisture: Soilmoisture }
}

export interface Soilmoisture {
  time: string;
  unit: string;
  value: string;
}

export interface SoilCh1 {
  soilmoisture: Soilmoisture;
}

export interface SoilCh2 {
  soilmoisture: Soilmoisture;
}


export interface SoilCh3 {
  soilmoisture: Soilmoisture;
}
export interface SoilCh4 {
  soilmoisture: Soilmoisture;
}

export interface SoilCh5 {
  soilmoisture: Soilmoisture;
}

export interface SoilCh6 {
  soilmoisture: Soilmoisture;
}

export interface SoilCh7 {
  soilmoisture: Soilmoisture;
}

export interface SoilCh8 {
  soilmoisture: Soilmoisture;
}

export interface SoilmoistureSensorCh1 {
  time: string;
  unit: string;
  value: string;
}

export interface SoilmoistureSensorCh2 {
  time: string;
  unit: string;
  value: string;
}

export interface SoilmoistureSensorCh3 {
  time: string;
  unit: string;
  value: string;
}

export interface SoilmoistureSensorCh4 {
  time: string;
  unit: string;
  value: string;
}

export interface SoilmoistureSensorCh5 {
  time: string;
  unit: string;
  value: string;
}

export interface SoilmoistureSensorCh6 {
  time: string;
  unit: string;
  value: string;
}

export interface SoilmoistureSensorCh7 {
  time: string;
  unit: string;
  value: string;
}

export interface SoilmoistureSensorCh8 {
  time: string;
  unit: string;
  value: string;
}
