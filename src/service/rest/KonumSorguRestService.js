import SonKonumEllipseResponse from "../../model/response/konum/SonKonumEllipseResponse";
import SonKonumSectorResponse from "../../model/response/konum/SonKonumSectorResponse";
import SonKonumCircularResponse from "../../model/response/konum/SonKonumCircularResponse";
import SonBazResponse from "../../model/response/konum/SonBazResponse";

export default class KonumSorguRestService {
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
        360 - 45,
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

  static sonBazSorgula(hedef) {
    console.log(hedef);

    return new SonBazResponse(
      Date.now(),
      6010514563,
      39.95244,
      32.80991,
      0,
      "GAZI Istanbul Yolu",
    );
  }
}
