import { useState, forwardRef, useImperativeHandle } from "react";
import "./HedefListesiTable.css";

const HedefListesiTable = forwardRef((props, ref) => {
  const [hedef, setHedef] = useState(null);
  const [hide, setHide] = useState(false);

  useImperativeHandle(ref, () => ({
    unSelect() {
      console.log("child function");
      setHedef(null);
    },
  }));

  const onRowSelect = (e, hedef) => {
    setHedef(hedef);

    Array.from(e.target.parentElement.parentElement.children).forEach((item) =>
      item.classList.remove("selected"),
    );

    e.target.parentElement.classList.add("selected");
  };

  const onHeaderClick = () => {
    setHedef(null);
    setHide(!hide);
  };

  return (
    <table class="targettable">
      <thead>
        <tr>
          <th onClick={() => onHeaderClick()} title={hide ? "Göster" : "Gizle"}>
            {props.header} [{props.data.length}]
          </th>
        </tr>
      </thead>
      <tbody style={{ display: hide ? "none" : "" }}>
        {props.data.map((hedef) => (
          <tr onClick={(e) => onRowSelect(e, hedef)}>
            <td>{hedef.targetValue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export default HedefListesiTable;
