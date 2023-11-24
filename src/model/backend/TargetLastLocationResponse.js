import TargetLocation from "./TargetLocation";

export default class TargetLastLocationResponse {
  constructor(mapFocus, data) {
    this.mapFocus = mapFocus;
    this.requestId = data.requestId;
    this.operator = data.operator;
    this.responseCode = data.responseCode;
    this.responseMessage = data.responseMessage;
    this.locations = [];

    data.locations.map((item) => {
      locations.push(new TargetLocation(item));
    });
  }
}
