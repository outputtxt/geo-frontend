import SonKonumEllipseResponse from "../../model/response/SonKonumEllipseResponse";
import SonKonumSectorResponse from "../../model/response/SonKonumSectorResponse";
import SonKonumCircularResponse from "../../model/response/SonKonumCircularResponse";

export default class KonumSorguService {
  static sonKonumSorgula(hedef) {
    console.log(hedef);

    if (hedef.targetType === "MSISDN") {
      //   return new SonKonumSectorResponse(
      //     hedef.targetValue,
      //     Date.now(),
      //     39.83834,
      //     32.66,
      //     39.83834,
      //     32.66,
      //     3015,
      //     3286,
      //     0,
      //     360,
      //     "Ankara Yenimahalle Merkez",
      //   );

      return new SonKonumSectorResponse(
        hedef.targetValue,
        Date.now(),
        39.92299,
        32.80831,
        39.91719,
        32.81303,
        625,
        896,
        294,
        362,
        "Ankara Yenimahalle Tepe",
      );
    } else if (hedef.targetType === "IMEI") {
      // hedef, tarih, X, Y, minRadius, maxRadius, angle, adres

      return new SonKonumEllipseResponse(
        hedef.targetValue,
        Date.now(),
        39.90888,
        32.7612,
        148,
        299,
        45,
        "Ankara, Çankaya, Merkez",
      );
    } else {
      // IMSI
      return new SonKonumCircularResponse(
        hedef.targetValue,
        Date.now(),
        37.05861,
        37.3474,
        537,
        "Antep Şahinbey Merkez",
      );
    }
  }
}
