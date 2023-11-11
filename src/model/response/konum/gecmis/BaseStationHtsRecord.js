import CallDetails from "./CallDetails";
import CellLocationWithID from "../../baz/CellLocationWithID";

export default class BaseStationHtsRecord {
  constructor(no1, tip, no2, tarih, sure, cellId, bazX, bazY, angle, adres) {
    this.callDetails = new CallDetails(no1, tip, no2, tarih, sure);
    this.cellLocation = new CellLocationWithID(
      cellId,
      bazX,
      bazY,
      angle,
      adres,
    );
  }
}
