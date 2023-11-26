import BaseStationLocation from "./BaseStationLocation";

export default class BaseStationInfo {
  
    constructor(item) {
      this.cellId = item.cellId;
      this.dateTime = item.dateTime;
      this.location = new BaseStationLocation(item.location);
      this.address = item.address;
    }
  }
