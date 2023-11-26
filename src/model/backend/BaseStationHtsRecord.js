import CallDetails from "./CallDetails";
import BaseStationInfo from "./BaseStationInfo";

export default class BaseStationHtsRecord {
  
    constructor(item) {
      this.callDetails = new CallDetails(item.callDetails);
      this.baseStationInfo = new BaseStationInfo(item.baseStationInfo);
    }
  }
