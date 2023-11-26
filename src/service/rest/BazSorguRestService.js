import BaseStationInfoResponse from "../../model/backend/BaseStationInfoResponse";
// import CellSorguResponse from "../../model/response/baz/CellSorguResponse";
import CellLocation from "../../model/response/baz/CellLocation";
import OperatorTipi from "../../model/enum/OperatorTipi";
import mockAveaBazListData from "../rest/mocks/data/mockAveaBazListData.json";
import mockTurkcellBazListData from "../rest/mocks/data/mockTurkcellBazListData.json";
import mockVodafoneBazListData from "../rest/mocks/data/mockVodafoneBazListData.json";
import { v4 as uuidv4 } from 'uuid';

export default class BazSorguRestService {
  static async cellSorgula(mapFocus, operator, cellId) {
    console.log(operator, cellId);

    try {
      const fetchResponse = await fetch("http://localhost:8080/baseStation/baseStationInfo", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          id: uuidv4(),
          operator: operator.toUpperCase(),
          cellId: cellId
        })
      });

      const data = await fetchResponse.json();
      console.log(data);

      var response = new BaseStationInfoResponse(mapFocus, data);
    } catch (error) {
      console.error("There was an error!", error);
      return null;
    }

    return response;



    // return new CellSorguResponse(
    //   2120514563,
    //   39.90845,
    //   32.75165,
    //   (cellId % 2 == 0 ? 340 : 0),
    //   "GAZI Istanbul Yolu",
    // );
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
