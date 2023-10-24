import EllipseArea from "../../area/EllipseArea";
import SonKonumResponse from "./SonKonumResponse";

export default class SonKonumEllipseResponse extends SonKonumResponse {
  constructor(hedef, tarih, X, Y, minRadius, maxRadius, angle, adres) {
    super(hedef, tarih, adres);
    this.ellipse = new EllipseArea(X, Y, minRadius, maxRadius, angle);
  }
}
