import Constants from "../../util/Constants";
import TargetLastLocationResponse from "../../model/backend/TargetLastLocationResponse";
import TargetLastLocationHistoryResponse from "../../model/backend/TargetLastLocationHistoryResponse";
import TargetLastBaseStationResponse from "../../model/backend/TargetLastBaseStationResponse";
import TargetLastXDaysBaseStationsResponse from "../../model/backend/TargetLastXDaysBaseStationsResponse";

import mockGecmisKonumData from "../../service/rest/mocks/data/mockGecmisKonumData.json";
import mockTargetLastLocationHistoryResponse_1 from "../../service/rest/mocks/data/backend/mockTargetLastLocationHistoryResponse_1.json";
import mockTargetLastLocationResponse_1 from "../../service/rest/mocks/data/backend/mockTargetLastLocationResponse_1.json";
import mockTargetLastLocationResponse_2 from "../../service/rest/mocks/data/backend/mockTargetLastLocationResponse_2.json";
import mockTargetLastLocationResponse_3 from "../../service/rest/mocks/data/backend/mockTargetLastLocationResponse_3.json";
import { v4 as uuidv4 } from "uuid";

export default class KonumSorguRestService {
  //==============================  SON KONUM SORGU  ==============================
  static async sonKonumSorgula(target, mapFocus) {
    try {
      const fetchResponse = await fetch(
        Constants.BASE_URL + "/targetLocation/lastLocation",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            id: uuidv4(),
            target: {
              targetValue: target.targetValue,
              targetType: target.targetType,
            },
          }),
        },
      );

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

  //==============================  SON KONUM GECMIS SORGU  ==============================
  static async sonKonumGecmisSorgula(target, dateRange, mapFocus) {
    try {
      const fetchResponse = await fetch(
        Constants.BASE_URL + "/targetLocation/lastLocationHistory",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            id: uuidv4(),
            target: {
              targetValue: target.targetValue,
              targetType: target.targetType,
            },
            startDate: dateRange[1],
            endDate: dateRange[0],
          }),
        },
      );

      const data = await fetchResponse.json();
      console.log(data);

      var response = new TargetLastLocationHistoryResponse(mapFocus, data);
      // var response = new TargetLastLocationHistoryResponse(mapFocus, mockTargetLastLocationHistoryResponse_1);
    } catch (error) {
      console.error("There was an error!", error);
    }

    return response;
  }

  //==============================  SON BAZ SORGU  ==============================
  static async sonBazSorgula(target, mapFocus) {
    try {
      const fetchResponse = await fetch(
        Constants.BASE_URL + "/baseStation/lastBaseStationOfTarget",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            id: uuidv4(),
            target: {
              targetValue: target.targetValue,
              targetType: target.targetType,
            },
          }),
        },
      );

      const data = await fetchResponse.json();
      console.log(data);

      var response = new TargetLastBaseStationResponse(mapFocus, data);
    } catch (error) {
      console.error("There was an error!", error);
    }

    return response;

    // return new SonBazResponse(
    //   mapFocus,
    //   Date.now(),
    //   6010514563,
    //   39.95244,
    //   32.80991,
    //   target.targetValue % 2 == 0 ? 0 : 140,
    //   "GAZI Istanbul Yolu",
    // );
  }

  //==============================  SON BAZ X GUN SORGU  ==============================
  static async sonBazXGunSorgula(mapFocus, selectMarker, target, sonKacGun) {
    try {
      const fetchResponse = await fetch(
        Constants.BASE_URL + "/baseStation/lastXDaysBaseStationsOfTarget",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            id: uuidv4(),
            target: {
              targetValue: target.targetValue,
              targetType: target.targetType,
            },
            numberOfDays: sonKacGun,
          }),
        },
      );

      const data = await fetchResponse.json();
      console.log(data);

      var response = new TargetLastXDaysBaseStationsResponse(
        mapFocus,
        selectMarker,
        data,
      );
    } catch (error) {
      console.error("There was an error!", error);
    }

    return response;
  }

  // static gecmisTarihSorgula(hedef, dateRange, mapFocus, selectMarker) {
  //   // const [startDate, endDate] = dateRange;
  //   // console.log("hedef: " + hedef.targetValue);
  //   // console.log("startDate: %s, endDate: %s", startDate, endDate);
  //   // console.log(mockGecmisKonumData);

  //   return new GecmisKonumSorguResponse(
  //     mapFocus,
  //     selectMarker,
  //     mockGecmisKonumData,
  //   );
  // }
}
