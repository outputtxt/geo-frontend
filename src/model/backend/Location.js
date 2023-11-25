export default class Location {
  constructor(item) {
    this.midPointLatitude = item.midPointLatitude;
    this.midPointLongitude = item.midPointLongitude;
    this.baseStationLatitude = item.baseStationLatitude;
    this.baseStationLongitude = item.baseStationLongitude;
    this.inRadius = item.inRadius;
    this.outRadius = item.outRadius;
    this.startAngle = item.startAngle;
    this.stopAngle = item.stopAngle;
    this.areaType = item.areaType;
  }
}
