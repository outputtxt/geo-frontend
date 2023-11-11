import BaseStationHtsRecord from "./BaseStationHtsRecord";
import CellSorguResponse from "../../baz/CellSorguResponse";
import { format } from "date-fns";
import "../table.css";

export default class GecmisKonumSorguResponse {
  constructor(mapFocus, data) {
    this.mapFocus = mapFocus;
    this.htsList = [];
    this.baseStationMap = new Map();

    data.map(
      (item) => (
        this.htsList.push(
          new BaseStationHtsRecord(
            item.callDetails.no1,
            item.callDetails.tip,
            item.callDetails.no2,
            item.callDetails.tarih,
            item.callDetails.sure,
            item.baseStationInfo.cellId,
            item.baseStationInfo.bazX,
            item.baseStationInfo.bazY,
            item.baseStationInfo.angle,
            item.baseStationInfo.adres,
          ),
        ),
        this.baseStationMap.set(
          item.baseStationInfo.cellId,
          new CellSorguResponse(
            item.baseStationInfo.cellId,
            item.baseStationInfo.bazX,
            item.baseStationInfo.bazY,
            item.baseStationInfo.angle,
            item.baseStationInfo.adres,
          ),
        )
      ),
    );
  }

  getTable = () => {
    return (
      <table className="contenttable">
        <thead>
          <tr>
            <th style={{ width: "3%" }}></th>
            <th style={{ width: "8%" }}>No1</th>
            <th style={{ width: "5%" }}>Tip</th>
            <th style={{ width: "8%" }}>No2</th>
            <th style={{ width: "10%" }}>Tarih</th>
            <th style={{ width: "3%" }}>Süre</th>
            <th style={{ width: "5%" }}>CellID</th>
            <th style={{ width: "5%" }}>BazX</th>
            <th style={{ width: "5%" }}>BazY</th>
            <th style={{ width: "3%" }}>Açı</th>
            <th style={{ width: "45%", textAlign: "left", paddingLeft: "5px" }}>
              Adres
            </th>
          </tr>
        </thead>
        <tbody>
          {this.htsList.map((item, index) => (
            <tr
              key={"hts" + index + 1}
              onDoubleClick={() =>
                this.mapFocus(item.cellLocation.X, item.cellLocation.Y)
              }
            >
              <td>{index + 1}</td>
              <td>{item.callDetails.no1}</td>
              <td>{item.callDetails.tip}</td>
              <td>{item.callDetails.no2}</td>
              <td>
                {format(
                  new Date(item.callDetails.tarih),
                  "yyyy/MM/dd HH:mm:ss",
                )}
              </td>
              <td>{item.callDetails.sure}</td>
              <td>{item.cellLocation.cellId}</td>
              <td>{item.cellLocation.X}</td>
              <td>{item.cellLocation.Y}</td>
              <td>{item.cellLocation.angle}</td>
              <td style={{ textAlign: "left", paddingLeft: "5px" }}>
                {item.cellLocation.adres}
              </td>
            </tr>
          ))}
          <tr>
            <td style={{ backgroundColor: "#8d959e" }} colSpan="11"></td>
          </tr>
        </tbody>
      </table>
    );
  };
}
