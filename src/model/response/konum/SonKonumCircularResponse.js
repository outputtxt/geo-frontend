import CircularArea from "../../area/CircularArea";
import SonKonumResponse from "./SonKonumResponse";
import { format } from "date-fns";
import "../../table.css";

export default class SonKonumCircularResponse extends SonKonumResponse {
  constructor(mapFocus, hedef, tarih, X, Y, radius, adres) {
    super(mapFocus, hedef, tarih, adres);
    this.circle = new CircularArea(X, Y, radius);
  }

  getTable = () => {
    return (
      <table className="contenttable">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Hedef</th>
            <th style={{ width: "15%" }}>Tarih</th>
            <th style={{ width: "8%" }}>X</th>
            <th style={{ width: "8%" }}>Y</th>
            <th style={{ width: "8%" }}>Radius</th>
            <th style={{ width: "51%", textAlign: "left", paddingLeft: "5px" }}>
              Adres
            </th>
          </tr>
        </thead>
        <tbody>
          <tr onDoubleClick={() => this.mapFocus(this.circle.X, this.circle.Y)}>
            <td>{this.hedef}</td>
            <td>{format(new Date(this.tarih), "yyyy/MM/dd HH:mm:ss")}</td>
            <td>{this.circle.X}</td>
            <td>{this.circle.Y}</td>
            <td>{this.circle.radius}</td>
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
