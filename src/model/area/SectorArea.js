import { getLatLngs } from "../../util/SectorHelper";

export default class SectorArea {
  constructor(bazX, bazY, inRadius, outRadius, startAngle, stopAngle, X, Y) {
    this.bazX = parseFloat(bazX); //base station X coordinate,
    this.bazY = parseFloat(bazY); //base station Y coordinate,
    this.inRadius = parseFloat(inRadius); // hedefin baz istasyonuna olan min uzakligi
    this.outRadius = parseFloat(outRadius); // hedefin baz istasyonuna olan max uzakligi
    this.startAngle = parseFloat(startAngle); // baz'a olan uzaklik dilimi baslangic acisi
    this.stopAngle = parseFloat(stopAngle); // baz'a olan uzaklik dilimi bitis acisi

    if (X && Y) {
      this.X = parseFloat(X); // center of sector X, if not present calculate
      this.Y = parseFloat(Y); // center of sector Y, if not present calculate
    } else {
      let latlngs = getLatLngs(
        [parseFloat(bazX), parseFloat(bazY)],
        parseFloat(inRadius),
        parseFloat(outRadius),
        parseFloat(startAngle),
        parseFloat(stopAngle),
        1000,
      );

      var minLat = latlngs.reduce((accumulator, currentValue) => {
        return accumulator.lat < currentValue.lat ? accumulator : currentValue;
      });

      var maxLat = latlngs.reduce((accumulator, currentValue) => {
        return accumulator.lat > currentValue.lat ? accumulator : currentValue;
      });

      var minLng = latlngs.reduce((accumulator, currentValue) => {
        return accumulator.lng < currentValue.lng ? accumulator : currentValue;
      });

      var maxLng = latlngs.reduce((accumulator, currentValue) => {
        return accumulator.lng > currentValue.lng ? accumulator : currentValue;
      });

      this.X = minLat.lat + (maxLat.lat - minLat.lat) / 2;
      this.Y = minLng.lng + (maxLng.lng - minLng.lng) / 2;
    }
  }
}
