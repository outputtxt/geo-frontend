
import BaseStationInfo from "./BaseStationInfo";
import "../table.css";


export default class BaseStationInfoResponse {
  
  constructor(mapFocus, data) {
    this.mapFocus = mapFocus;
    
    this.requestId = data.requestId;
    this.responseCode = data.responseCode;
    this.responseMessage = data.responseMessage;
    this.baseStationDetail = new BaseStationInfo(data.baseStationDetail);
  }

  getTable = () => {
    return (
      <table className="contenttable">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>CellID</th>
            <th style={{ width: "10%" }}>Baz Enlem</th>
            <th style={{ width: "10%" }}>Baz Boylam</th>
            <th style={{ width: "10%" }}>Açı</th>
            <th style={{ width: "60%", textAlign: "left", paddingLeft: "5px" }}>
              Adres
            </th>
          </tr>
        </thead>
            <tbody>
                <tr onDoubleClick={() =>
                    this.mapFocus(this.baseStationDetail.location.latitude,
                        this.baseStationDetail.location.longitude)
                }>
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
