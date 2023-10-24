import CellSorguResponse from "../../model/response/baz/CellSorguResponse";

export default class bazSorguService {
  static cellSorgula(operator, cellId) {
    console.log(operator, cellId);

    return new CellSorguResponse(
      2120514563,
      39.90845,
      32.75165,
      3,
      "GAZI Istanbul Yolu",
    );
  }
}
