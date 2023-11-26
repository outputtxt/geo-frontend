export default class BaseStationLocation {
  
    constructor(item) {
      this.latitude = parseFloat(item.latitude);
      this.longitude = parseFloat(item.longitude);
      this.angle = parseFloat(item.angle);
    }
  }
  