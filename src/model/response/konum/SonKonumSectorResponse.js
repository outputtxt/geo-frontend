import SectorArea from "../../area/SectorArea";
import SonKonumResponse from "./SonKonumResponse";

export default class SonKonumSectorResponse extends SonKonumResponse {
  constructor(
    hedef,
    tarih,
    X,
    Y,
    bazX,
    bazY,
    inRadius,
    outRadius,
    startAngle,
    stopAngle,
    adres,
  ) {
    super(hedef, tarih, adres);
    this.sector = new SectorArea(
      bazX,
      bazY,
      inRadius,
      outRadius,
      startAngle,
      stopAngle,
      X,
      Y,
    );
  }
}
