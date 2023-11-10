import { format } from "date-fns";
import "./table.css";

export default class SonBazResponse {
  constructor(mapFocus, tarih, cellId, bazX, bazY, angle, adres) {
    this.mapFocus = mapFocus;
    this.tarih = tarih;
    this.cellId = cellId;
    this.bazX = bazX;
    this.bazY = bazY;
    this.angle = angle;
    this.adres = adres;
  }

  getTable = () => {
    return (
      <table className="contenttable">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Tarih</th>
            <th style={{ width: "10%" }}>Cell ID</th>
            <th style={{ width: "8%" }}>BazX</th>
            <th style={{ width: "8%" }}>BazY</th>
            <th style={{ width: "8%" }}>Angle</th>
            <th style={{ width: "56%", textAlign: "left", paddingLeft: "5px" }}>
              Adres
            </th>
          </tr>
        </thead>
        <tbody>
          <tr onDoubleClick={() => this.mapFocus(this.bazX, this.bazY)}>
            <td>{format(new Date(this.tarih), "yyyy/MM/dd HH:mm:ss")}</td>
            <td>{this.cellId}</td>
            <td>{this.bazX}</td>
            <td>{this.bazY}</td>
            <td>{this.angle}</td>
            <td style={{ textAlign: "left", paddingLeft: "5px" }}>
              {this.adres}
            </td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#8d959e" }} colSpan="11"></td>
          </tr>
        </tbody>
      </table>
    );
  };
}
