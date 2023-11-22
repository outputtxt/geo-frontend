import Target from "./Target";
import Target from "./Location";

export default class TargetLocation {
  constructor(item) {
    this.target = new Target(item.target.targetValue, item.target.targetType);
    this.dateTime = item.dateTime;
    this.location = new Location(item.location);
    this.primaryDevice = item.primaryDevice;
  }
}
