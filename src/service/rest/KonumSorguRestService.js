import TargetLastLocationResponse from "../../model/backend/TargetLastLocationResponse";
import SonKonumEllipseResponse from "../../model/response/konum/SonKonumEllipseResponse";
import SonKonumSectorResponse from "../../model/response/konum/SonKonumSectorResponse";
import SonKonumCircularResponse from "../../model/response/konum/SonKonumCircularResponse";
import SonBazResponse from "../../model/response/konum/SonBazResponse";
import GecmisKonumSorguResponse from "../../model/response/konum/gecmis/GecmisKonumSorguResponse";
import mockGecmisKonumData from "../../service/rest/mocks/data/mockGecmisKonumData.json";
import mockTargetLastLocationResponse_1 from "../../service/rest/mocks/data/backend/mockTargetLastLocationResponse_1.json";
import mockTargetLastLocationResponse_2 from "../../service/rest/mocks/data/backend/mockTargetLastLocationResponse_2.json";
import mockTargetLastLocationResponse_3 from "../../service/rest/mocks/data/backend/mockTargetLastLocationResponse_3.json";
import { v4 as uuidv4 } from 'uuid';

export default class KonumSorguRestService {
  static async sonKonumSorgula(target, mapFocus) {
    try {
      const fetchResponse = await fetch("http://localhost:8080/targetLocation/lastLocation", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          id: uuidv4(),
          target: {
              targetValue: target.targetValue,
              targetType: target.targetType
          }
        })
      });

      const data = await fetchResponse.json();
      console.log(data);
      var response = new TargetLastLocationResponse(mapFocus, data);

    } catch (error) {
      console.error("There was an error!", error);
    }

    return response;

    
    // if (target.targetType === "MSISDN") {
    //   return new TargetLastLocationResponse(mapFocus, mockTargetLastLocationResponse_1);
    // } else if (target.targetType === "IMEI") {
    //   return new TargetLastLocationResponse(mapFocus, mockTargetLastLocationResponse_2);
    // } else {
    //   return new TargetLastLocationResponse(mapFocus, mockTargetLastLocationResponse_3);
    // }
  }

  static sonBazSorgula(hedef, mapFocus) {
    console.log(hedef);

    return new SonBazResponse(
      mapFocus,
      Date.now(),
      6010514563,
      39.95244,
      32.80991,
      hedef.targetValue % 2 == 0 ? 0 : 140,
      "GAZI Istanbul Yolu",
    );
  }

  static gecmisTarihSorgula(hedef, dateRange, mapFocus, selectMarker) {
    // const [startDate, endDate] = dateRange;
    // console.log("hedef: " + hedef.targetValue);
    // console.log("startDate: %s, endDate: %s", startDate, endDate);
    // console.log(mockGecmisKonumData);

    return new GecmisKonumSorguResponse(
      mapFocus,
      selectMarker,
      mockGecmisKonumData,
    );
  }
}
