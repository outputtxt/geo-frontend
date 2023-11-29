import TargetLocation from "./TargetLocation";
import { format } from "date-fns";
import "../table.css";


export default class TargetLastLocationResponse {
  
  constructor(mapFocus, data) {
    this.mapFocus = mapFocus;
    
    this.requestId = data.requestId;
    this.operator = data.operator;
    this.responseCode = data.responseCode;
    this.responseMessage = data.responseMessage;
    this.locations = [];

    data.locations.map((item) => {
      this.locations.push(new TargetLocation(item));
    });
  }

  getTable = () => {
    return (
      <table className="contenttable">
        <thead>
          <tr>
            <th style={{ width: "3%" }}></th>
            <th style={{ width: "7%" }}>Hedef</th>
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
          {this.locations.map((targetLocation, index) =>(
            <tr
              key={"tllTableRow" + index + 1}
              onDoubleClick={() =>
                this.mapFocus(targetLocation.location.baseStationLatitude, 
                  targetLocation.location.baseStationLongitude)
              }
            >
              <td>{index + 1}</td>
              <td>{targetLocation.target.targetValue}</td>
              <td>{format(new Date(targetLocation.dateTime), "yyyy/MM/dd HH:mm:ss")}</td>
              <td>{targetLocation.location.midPointLatitude}</td>
              <td>{targetLocation.location.midPointLongitude}</td>
              <td>{targetLocation.location.baseStationLatitude}</td>
              <td>{targetLocation.location.baseStationLongitude}</td>
              <td>{targetLocation.location.inRadius}</td>
              <td>{targetLocation.location.outRadius}</td>
              <td>{targetLocation.location.startAngle}</td>
              <td>{targetLocation.location.stopAngle}</td>
              <td style={{ textAlign: "left", paddingLeft: "5px" }}>
                {targetLocation.address}
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
