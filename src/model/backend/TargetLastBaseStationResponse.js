
import BaseStationInfo from "./BaseStationInfo";
import { format } from "date-fns";
import "../table.css";

export default class TargetLastBaseStationResponse {

  constructor(mapFocus, data) {
    this.mapFocus = mapFocus;
    
    this.requestId = data.requestId;
    this.operator = data.operator;
    this.responseCode = data.responseCode;
    this.responseMessage = data.responseMessage;
    this.baseStationDetail = new BaseStationInfo(data.baseStationDetail);
  }

  getTable = () => {
    return (
      <table className="contenttable">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Tarih</th>
            <th style={{ width: "10%" }}>Operatör</th>
            <th style={{ width: "9%" }}>CellID</th>
            <th style={{ width: "9%" }}>Baz Enlem</th>
            <th style={{ width: "9%" }}>Baz Boylam</th>
            <th style={{ width: "8%" }}>Açı</th>
            <th style={{ width: "45%", textAlign: "left", paddingLeft: "5px" }}>
              Adres
            </th>
          </tr>
        </thead>
        <tbody>
          <tr onDoubleClick={() =>
            this.mapFocus(this.baseStationDetail.location.latitude,
              this.baseStationDetail.location.longitude)
          }>
            <td>{format(new Date(this.baseStationDetail.dateTime), "yyyy/MM/dd HH:mm:ss")}</td>
            <td>{this.operator}</td>
            <td>{this.baseStationDetail.cellId}</td>
            <td>{this.baseStationDetail.location.latitude}</td>
            <td>{this.baseStationDetail.location.longitude}</td>
            <td>{this.baseStationDetail.location.angle}</td>
            <td style={{ textAlign: "left", paddingLeft: "5px" }}>
              {this.baseStationDetail.address}
            </td>
          </tr>

          <tr style={{ height: "20px" }}>
            <td style={{ backgroundColor: "#8d959e" }} colSpan="11"></td>
          </tr>
        </tbody>
      </table>
    );
  };
}
