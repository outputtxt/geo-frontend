import BaseStationInfoResponse from "../../model/backend/BaseStationInfoResponse";
import CellLocation from "../../model/response/baz/CellLocation";
import OperatorTipi from "../../model/enum/OperatorTipi";
import Constants from "../../util/Constants";
import mockAveaBazListData from "../rest/mocks/data/mockAveaBazListData.json";
import mockTurkcellBazListData from "../rest/mocks/data/mockTurkcellBazListData.json";
import mockVodafoneBazListData from "../rest/mocks/data/mockVodafoneBazListData.json";
import { v4 as uuidv4 } from "uuid";

export default class BazSorguRestService {
  static async cellSorgula(mapFocus, operator, cellId, token) {
    console.log(operator, cellId);

    //===============================  PROD  ===============================
    // try {
    //   const fetchResponse = await fetch(
    //     Constants.BASE_URL + "/baseStation/baseStationInfo",
    //     {
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + token,
    //       },
    //       method: "POST",
    //       body: JSON.stringify({
    //         id: uuidv4(),
    //         operator: operator.toUpperCase(),
    //         cellId: cellId,
    //       }),
    //     },
    //   );

    //   const data = await fetchResponse.json();
    //   console.log(data);

    //   var response = new BaseStationInfoResponse(mapFocus, data);
    // } catch (error) {
    //   console.error("There was an error!", error);
    //   return null;
    // }

    // return response;

    //===============================  TEST  ===============================
    var data = {
      requestId: "6926213c-e11f-417e-bd7b-16ee57395fd8",
      responseCode: "SUCCESS",
      responseMessage: "SUCCESS",
      baseStationDetail: {
        cellId: cellId,
        dateTime: Date.now(),
        location: {
          latitude: 39.90845,
          longitude: 32.75165,
          angle: cellId % 2 == 0 ? 340 : 0,
        },
        address: "Gazi Istanbul Yolu",
      },
    };

    return new BaseStationInfoResponse(mapFocus, data);
  }

  static bazListeSorgula(operator) {
    var cellList = [];

    if (operator === OperatorTipi[0]) {
      // AVEA
      mockAveaBazListData.map((baz) => {
        cellList.push(
          new CellLocation(baz.bazX, baz.bazY, baz.angle, baz.adres),
        );
      });
    } else if (operator === OperatorTipi[1]) {
      // TURKCELL
      mockTurkcellBazListData.map((baz) => {
        cellList.push(
          new CellLocation(baz.bazX, baz.bazY, baz.angle, baz.adres),
        );
      });
    } else {
      // if (operator === OperatorTipi[2]) { // VODAFONE
      mockVodafoneBazListData.map((baz) => {
        cellList.push(
          new CellLocation(baz.bazX, baz.bazY, baz.angle, baz.adres),
        );
      });
    }

    return cellList;
  }
}
