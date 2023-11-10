import EllipseArea from "../../area/EllipseArea";
import SonKonumResponse from "./SonKonumResponse";
import { format } from "date-fns";
import "./table.css";

export default class SonKonumEllipseResponse extends SonKonumResponse {
  constructor(hedef, tarih, X, Y, minRadius, maxRadius, angle, adres) {
    super(hedef, tarih, adres);
    this.ellipse = new EllipseArea(X, Y, minRadius, maxRadius, angle);
  }

  getTable = () => {
    return (
      <table className="contenttable">
        <thead>
          <tr>
            <th style={{ width: "8%" }}>Hedef</th>
            <th style={{ width: "10%" }}>Tarih</th>
            <th style={{ width: "7%" }}>X</th>
            <th style={{ width: "7%" }}>Y</th>
            <th style={{ width: "6%" }}>Min Radius</th>
            <th style={{ width: "6%" }}>Max Radius</th>
            <th style={{ width: "6%" }}>Angle</th>
            <th style={{ width: "40%" }}>Adres</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{this.hedef}</td>
            <td>{format(new Date(this.tarih), "yyyy/MM/dd HH:mm:ss")}</td>
            <td>{this.ellipse.X}</td>
            <td>{this.ellipse.Y}</td>
            <td>{this.ellipse.bazX}</td>
            <td>{this.ellipse.bazY}</td>
            <td>{this.ellipse.inRadius}</td>
            <td>{this.sector.adres}</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#8d959e" }} colSpan="11"></td>
          </tr>
        </tbody>
      </table>
    );
  };
}
