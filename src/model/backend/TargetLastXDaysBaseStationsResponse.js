
import BaseStationHtsRecord from "./BaseStationHtsRecord";
import { format } from "date-fns";
import "../table.css";

export default class TargetLastXDaysBaseStationsResponse {

  constructor(mapFocus, selectMarker, data) {
    this.mapFocus = mapFocus;
    this.selectMarker = selectMarker;
    
    this.requestId = data.requestId;
    this.responseCode = data.responseCode;
    this.responseMessage = data.responseMessage;

    this.baseStationHtsRecords = [];
    this.baseStationMap = new Map();

    data.baseStationHtsRecords.map((item) => {
      var baseStationHtsRecord = new BaseStationHtsRecord(item); 
      this.baseStationHtsRecords.push(baseStationHtsRecord);

      this.baseStationMap.set(baseStationHtsRecord.baseStationInfo.cellId,
         baseStationHtsRecord.baseStationInfo);
    });
  }

  getTable = () => {
    return (
        <table className="contenttable">
            <thead>
                <tr>
                    <th style={{ width: "3%" }}></th>
                    <th style={{ width: "7%" }}>No1</th>
                    <th style={{ width: "6%" }}>Tip</th>
                    <th style={{ width: "7%" }}>No2</th>
                    <th style={{ width: "10%" }}>Tarih</th>
                    <th style={{ width: "7%" }}>CellID</th>
                    <th style={{ width: "7%" }}>Baz Enlem</th>
                    <th style={{ width: "7%" }}>Baz Boylam</th>
                    <th style={{ width: "6%" }}>Açı</th>
                    <th style={{ width: "40%", textAlign: "left", paddingLeft: "5px" }}>
                        Adres
                    </th>
                </tr>
            </thead>
            <tbody>
                {this.baseStationHtsRecords.map((baseStationHtsRecord, index) => (
                    <tr key={"tlxdbsrTableRow" + index + 1}
                        onDoubleClick={() =>
                            this.mapFocus(baseStationHtsRecord.baseStationInfo.location.latitude,
                                baseStationHtsRecord.baseStationInfo.location.longitude)
                        }>
                        <td>{index + 1}</td>
                        <td>{baseStationHtsRecord.callDetails.callingParty}</td>
                        <td>{baseStationHtsRecord.callDetails.callType}</td>
                        <td>{baseStationHtsRecord.callDetails.calledParty}</td>
                        <td>{format(new Date(baseStationHtsRecord.callDetails.dateTime), "yyyy/MM/dd HH:mm:ss")}</td>
                        <td
                            id="htsCellIdSelector"
                            onClick={() => this.selectMarker(baseStationHtsRecord.baseStationInfo.cellId)}
                            style={{ cursor: "pointer" }}
                        >
                            {baseStationHtsRecord.baseStationInfo.cellId}
                        </td>
                        <td>{baseStationHtsRecord.baseStationInfo.location.latitude}</td>
                        <td>{baseStationHtsRecord.baseStationInfo.location.longitude}</td>
                        <td>{baseStationHtsRecord.baseStationInfo.location.angle}</td>
                        <td style={{ textAlign: "left", paddingLeft: "5px" }}>
                            {baseStationHtsRecord.baseStationInfo.address}
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
