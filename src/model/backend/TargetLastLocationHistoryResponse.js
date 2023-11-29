import TargetLocationHistory from "./TargetLocationHistory";
import { format } from "date-fns";
import "../table.css";


export default class TargetLastLocationHistoryResponse {
  
  constructor(mapFocus, data) {
    this.mapFocus = mapFocus;
    this.requestId = data.requestId;
    this.responseCode = data.responseCode;
    this.responseMessage = data.responseMessage;
    this.locations = [];

    data.locations.map((item) => {
      this.locations.push(new TargetLocationHistory(item));
    });
  }

  getTable = () => {
    return (
      <table className="contenttable">
        <thead>
          <tr>
            <th style={{ width: "3%" }}></th>
            <th style={{ width: "7%" }}>Operatör</th>
            <th style={{ width: "8%" }}>Tarih</th>
            <th style={{ width: "6%" }}>Merkez Enlem</th>
            <th style={{ width: "6%" }}>Merkez Boylam</th>
            <th style={{ width: "6%" }}>Baz Enlem</th>
            <th style={{ width: "6%" }}>Baz Boylam</th>
            <th style={{ width: "5%" }}>In Radius</th>
            <th style={{ width: "5%" }}>Out Radius</th>
            <th style={{ width: "4%" }}>Start Angle</th>
            <th style={{ width: "4%" }}>Stop Angle</th>
            <th style={{ width: "40%", textAlign: "left", paddingLeft: "5px" }}>
              Adres
            </th>
          </tr>
        </thead>
        <tbody>
          {this.locations.map((targetLocationHistory, index) =>(
            <tr
              key={"tlhTableRow" + index + 1}
              onDoubleClick={() =>
                this.mapFocus(targetLocationHistory.location.baseStationLatitude, 
                  targetLocationHistory.location.baseStationLongitude)
              }
            >
              <td>{index + 1}</td>
              <td>{targetLocationHistory.operator}</td>
              <td>{format(new Date(targetLocationHistory.dateTime), "yyyy/MM/dd HH:mm:ss")}</td>
              <td>{targetLocationHistory.location.midPointLatitude}</td>
              <td>{targetLocationHistory.location.midPointLongitude}</td>
              <td>{targetLocationHistory.location.baseStationLatitude}</td>
              <td>{targetLocationHistory.location.baseStationLongitude}</td>
              <td>{targetLocationHistory.location.inRadius}</td>
              <td>{targetLocationHistory.location.outRadius}</td>
              <td>{targetLocationHistory.location.startAngle}</td>
              <td>{targetLocationHistory.location.stopAngle}</td>
              <td style={{ textAlign: "left", paddingLeft: "5px" }}>
                {targetLocationHistory.address}
              </td>
            </tr>
          ))}
          
          <tr style={{ height: "20px" }}>
            <td style={{ backgroundColor: "#8d959e" }} colSpan="100%"></td>
          </tr>
        </tbody>
      </table>
    );
  };
}
