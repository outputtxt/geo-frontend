import SectorArea from "../../area/SectorArea";
import SonKonumResponse from "./SonKonumResponse";
import { format } from "date-fns";
import "./table.css";

export default class SonKonumSectorResponse extends SonKonumResponse {
  constructor(
    hedef,
    tarih,
    X,
    Y,
    bazX,
    bazY,
    inRadius,
    outRadius,
    startAngle,
    stopAngle,
    adres,
  ) {
    super(hedef, tarih, adres);
    this.sector = new SectorArea(
      bazX,
      bazY,
      inRadius,
      outRadius,
      startAngle,
      stopAngle,
      X,
      Y,
    );
  }

  getTable = () => {
    return (
      <table className="contenttable">
        <thead>
          <tr>
            <th style={{ width: "7%" }}>Hedef</th>
            <th style={{ width: "10%" }}>Tarih</th>
            <th style={{ width: "6%" }}>X</th>
            <th style={{ width: "6%" }}>Y</th>
            <th style={{ width: "6%" }}>BazX</th>
            <th style={{ width: "6%" }}>BazY</th>
            <th style={{ width: "5%" }}>In Radius</th>
            <th style={{ width: "5%" }}>Out Radius</th>
            <th style={{ width: "5%" }}>Start Angle</th>
            <th style={{ width: "5%" }}>Stop Angle</th>
            <th style={{ width: "39%" }}>Adres</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{this.hedef}</td>
            <td>{format(new Date(this.tarih), "yyyy/MM/dd HH:mm:ss")}</td>
            <td>{this.sector.X}</td>
            <td>{this.sector.Y}</td>
            <td>{this.sector.bazX}</td>
            <td>{this.sector.bazY}</td>
            <td>{this.sector.inRadius}</td>
            <td>{this.sector.outRadius}</td>
            <td>{this.sector.startAngle}</td>
            <td>{this.sector.stopAngle}</td>
            <td>{this.adres}</td>
          </tr>
          <tr style={{ height: "20px" }}>
            <td style={{ backgroundColor: "#8d959e" }} colSpan="11"></td>
          </tr>
        </tbody>
      </table>
    );
  };
}

// var(--background-color-4)
