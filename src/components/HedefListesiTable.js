import { useState } from "react";
import "./HedefListesiTable.css";

const HedefListesiTable = (data, setSelectedHedef) => {
  const [hedef, setHedef] = useState(null);

  const MSISDNdata = Array.from(data.data).filter(
    (hedef) => hedef.targetType === "MSISDN",
  );
  const IMEIdata = Array.from(data.data).filter(
    (hedef) => hedef.targetType === "IMEI",
  );
  const IMSIdata = Array.from(data.data).filter(
    (hedef) => hedef.targetType === "IMSI",
  );

  const onRowSelect = (e, hedef) => {
    setHedef(hedef);

    Array.from(e.target.parentElement.parentElement.children).forEach((item) =>
      item.classList.remove("selected"),
    );

    e.target.parentElement.classList.add("selected");
  };

  return (
    <div className="target-table">
      <table class="targettable">
        <thead>
          <tr>
            <th>Hedef</th>
          </tr>
        </thead>
        <tbody>
          {MSISDNdata.map((hedef) => (
            <tr onClick={(e) => onRowSelect(e, hedef)}>
              <td>{hedef.targetValue}</td>
            </tr>
          ))}
          <tr>
            {" "}
            <td> EMPTY </td>
          </tr>
          {IMEIdata.map((hedef) => (
            <tr>
              <td>{hedef.targetValue}</td>
            </tr>
          ))}
          <tr>
            {" "}
            <td>EMPTY</td>{" "}
          </tr>
          {IMSIdata.map((hedef) => (
            <tr>
              <td>{hedef.targetValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HedefListesiTable;
