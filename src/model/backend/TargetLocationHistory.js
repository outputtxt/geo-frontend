import Target from "./Target";
import Location from "./Location";

export default class TargetLocationHistory {
  constructor(item) {
    this.target = new Target(item.target.targetValue, item.target.targetType);
    this.operator = item.operator;
    this.dateTime = item.dateTime;
    this.location = new Location(item.location);
    this.primaryDevice = item.primaryDevice;
    this.address = item.address;
  }
}
