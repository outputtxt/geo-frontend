import SectorArea from "../../area/SectorArea";
import SonKonumResponse from "./SonKonumResponse";
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
            <td>Hedef</td>
            <td>Tarih</td>
            <td>X</td>
            <td>Y</td>
            <td>BazX</td>
            <td>BazY</td>
            <td>In Radius</td>
            <td>Out Radius</td>
            <td>Start Angle</td>
            <td>Stop Angle</td>
            <td>Adres</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{this.hedef}</td>
            <td>{this.tarih}</td>
            <td>{this.sector.X}</td>
            <td>{this.sector.Y}</td>
            <td>{this.sector.bazX}</td>
            <td>{this.sector.bazY}</td>
            <td>{this.sector.inRadius}</td>
            <td>{this.sector.outRadius}</td>
            <td>{this.sector.startAngle}</td>
            <td>{this.sector.stopAngle}</td>
            <td>{this.sector.adres}</td>
          </tr>
          <tr>
            <td>{this.hedef}</td>
            <td>{this.tarih}</td>
            <td>{this.sector.X}</td>
            <td>{this.sector.Y}</td>
            <td>{this.sector.bazX}</td>
            <td>{this.sector.bazY}</td>
            <td>{this.sector.inRadius}</td>
            <td>{this.sector.outRadius}</td>
            <td>{this.sector.startAngle}</td>
            <td>{this.sector.stopAngle}</td>
            <td>{this.sector.adres}</td>
          </tr>
          <tr>
            <td>{this.hedef}</td>
            <td>{this.tarih}</td>
            <td>{this.sector.X}</td>
            <td>{this.sector.Y}</td>
            <td>{this.sector.bazX}</td>
            <td>{this.sector.bazY}</td>
            <td>{this.sector.inRadius}</td>
            <td>{this.sector.outRadius}</td>
            <td>{this.sector.startAngle}</td>
            <td>{this.sector.stopAngle}</td>
            <td>{this.sector.adres}</td>
          </tr>
        </tbody>
      </table>
    );
  };
}
