import CellSorguResponse from "../../model/response/baz/CellSorguResponse";
import CellLocation from "../../model/response/baz/CellLocation";
import OperatorTipi from "../../model/enum/OperatorTipi";

export default class bazSorguService {
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
      cellList.push(new CellLocation(39.915316, 32.758462, 60, "adres"));
      cellList.push(new CellLocation(39.915316, 32.758462, 160, "adres"));
      cellList.push(new CellLocation(39.915316, 32.758462, 230, "adres"));

      cellList.push(new CellLocation(39.909786, 32.757411, 355, "adres"));
      cellList.push(new CellLocation(39.909786, 32.757411, 85, "adres"));
      cellList.push(new CellLocation(39.909786, 32.757411, 275, "adres"));

      cellList.push(new CellLocation(39.909786, 32.757218, 30, "adres"));
      cellList.push(new CellLocation(39.909786, 32.757218, 40, "adres"));
      cellList.push(new CellLocation(39.909786, 32.757218, 100, "adres"));
      cellList.push(new CellLocation(39.909786, 32.757218, 110, "adres"));
      cellList.push(new CellLocation(39.909786, 32.757218, 230, "adres"));

      cellList.push(new CellLocation(39.908847, 32.761209, 355, "adres"));
      cellList.push(new CellLocation(39.908847, 32.761209, 5, "adres"));

      cellList.push(new CellLocation(39.91383, 32.767861, 20, "adres"));
      cellList.push(new CellLocation(39.91383, 32.767861, 110, "adres"));
      cellList.push(new CellLocation(39.91383, 32.767861, 220, "adres"));
      cellList.push(new CellLocation(39.91383, 32.767861, 230, "adres"));

      cellList.push(new CellLocation(39.910469, 32.768247, 60, "adres"));
      cellList.push(new CellLocation(39.910469, 32.768247, 270, "adres"));

      cellList.push(new CellLocation(39.910485, 32.767206, 1, "adres"));
      cellList.push(new CellLocation(39.910485, 32.767206, 120, "adres"));
      cellList.push(new CellLocation(39.910485, 32.767206, 240, "adres"));

      cellList.push(new CellLocation(39.90867, 32.76557, 340, "adres"));
      cellList.push(new CellLocation(39.90867, 32.76557, 350, "adres"));
      cellList.push(new CellLocation(39.90867, 32.76557, 80, "adres"));
      cellList.push(new CellLocation(39.90867, 32.76557, 60, "adres"));
      cellList.push(new CellLocation(39.90867, 32.76557, 180, "adres"));
      cellList.push(new CellLocation(39.90867, 32.76557, 225, "adres"));
      cellList.push(new CellLocation(39.90867, 32.76557, 270, "adres"));

      cellList.push(new CellLocation(39.913678, 32.773236, 300, "adres"));
      cellList.push(new CellLocation(39.913678, 32.773236, 90, "adres"));
      cellList.push(new CellLocation(39.913678, 32.773236, 190, "adres"));
    } else if (operator === OperatorTipi[1]) {
      // TURKCELL
    } else {
      // if (operator === OperatorTipi[2]) { // VODAFONE
    }

    return cellList;
  }
}
