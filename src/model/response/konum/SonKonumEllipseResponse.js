import EllipseArea from "../../area/EllipseArea";
import SonKonumResponse from "./SonKonumResponse";
import { format } from "date-fns";
import "./table.css";

export default class SonKonumEllipseResponse extends SonKonumResponse {
  constructor(
    mapFocus,
    hedef,
    tarih,
    X,
    Y,
    minRadius,
    maxRadius,
    angle,
    adres,
  ) {
    super(mapFocus, hedef, tarih, adres);
    this.ellipse = new EllipseArea(X, Y, minRadius, maxRadius, angle);
  }

  getTable = () => {
    return (
      <table className="contenttable">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Hedef</th>
            <th style={{ width: "13%" }}>Tarih</th>
            <th style={{ width: "8%" }}>X</th>
            <th style={{ width: "8%" }}>Y</th>
            <th style={{ width: "7%" }}>Min Radius</th>
            <th style={{ width: "7%" }}>Max Radius</th>
            <th style={{ width: "7%" }}>Angle</th>
            <th style={{ width: "40%", textAlign: "left", paddingLeft: "5px" }}>
              Adres
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            onDoubleClick={() => this.mapFocus(this.ellipse.X, this.ellipse.Y)}
          >
            <td>{this.hedef}</td>
            <td>{format(new Date(this.tarih), "yyyy/MM/dd HH:mm:ss")}</td>
            <td>{this.ellipse.X}</td>
            <td>{this.ellipse.Y}</td>
            <td>{this.ellipse.minRadius}</td>
            <td>{this.ellipse.maxRadius}</td>
            <td>{this.ellipse.angle}</td>
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
