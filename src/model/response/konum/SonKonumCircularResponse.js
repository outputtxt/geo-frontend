import CircularArea from "../../area/CircularArea";
import SonKonumResponse from "./SonKonumResponse";

export default class SonKonumCircularResponse extends SonKonumResponse {
  constructor(hedef, tarih, X, Y, radius, adres) {
    super(hedef, tarih, adres);
    this.circle = new CircularArea(X, Y, radius);
  }
}
