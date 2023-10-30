import CellSorguResponse from "../../model/response/baz/CellSorguResponse";
import CellLocation from "../../model/response/baz/CellLocation";
import OperatorTipi from "../../model/enum/OperatorTipi";
import mockAveaBazListData from "../rest/mocks/data/mockAveaBazListData.json";
import mockTurkcellBazListData from "../rest/mocks/data/mockTurkcellBazListData.json";
import mockVodafoneBazListData from "../rest/mocks/data/mockVodafoneBazListData.json";

export default class BazSorguService {
  static cellSorgula(operator, cellId) {
    console.log(operator, cellId);

    return new CellSorguResponse(
      2120514563,
      39.90845,
      32.75165,
      (cellId % 2 == 0 ? 340 : 0),
      "GAZI Istanbul Yolu",
    );
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
