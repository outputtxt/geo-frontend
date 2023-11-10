export default class CallData {
  constructor(no1, tip, no2, sure, cellId, bazX, bazY, angle, adres) {
    this.no1 = no1;
    this.tip = tip;
    this.no2 = no2;
    this.sure = sure;
    this.cellId = cellId;
    this.bazX = parseFloat(bazX);
    this.bazY = parseFloat(bazY);
    this.angle = parseFloat(angle);
    this.adres = adres;
  }
}
