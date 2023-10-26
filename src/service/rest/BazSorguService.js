import CellSorguResponse from "../../model/response/baz/CellSorguResponse";
import CellLocation from "../../model/response/baz/CellLocation";
import OperatorTipi from "../../model/enum/OperatorTipi";
import mockAveaBazListData from "../rest/mocks/data/mockAveaBazListData.json";

export default class BazSorguService {
  static cellSorgula(operator, cellId) {
    console.log(operator, cellId);

    return new CellSorguResponse(
      2120514563,
      39.90845,
      32.75165,
      340,
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
    } else {
      // if (operator === OperatorTipi[2]) { // VODAFONE
    }

    return cellList;
  }
}
