import { useState, forwardRef, useImperativeHandle } from "react";
import "./HedefListesiTable.css";

const HedefListesiTable = forwardRef((props, ref) => {
  const [hide, setHide] = useState(false);
  const [lastSelectedRow, setLastSelectedRow] = useState(null);

  useImperativeHandle(ref, () => ({
    unSelect() {
      if (lastSelectedRow) {
        lastSelectedRow.classList.remove("selected");
        setLastSelectedRow(null);
      }
    },
  }));

  const onRowSelect = (e, hedef) => {
    props.setHedef(hedef);

    // Array.from(e.target.parentElement.parentElement.children).forEach((item) =>
    //   item.classList.remove("selected"),
    // );

    if (lastSelectedRow) {
      lastSelectedRow.classList.remove("selected");
    }

    e.target.parentElement.classList.add("selected");
    setLastSelectedRow(e.target.parentElement);
  };

  const onHeaderClick = () => {
    props.setHedef(null);

    if (lastSelectedRow) {
      lastSelectedRow.classList.remove("selected");
    }

    setHide(!hide);
  };

  return (
    <>
      {props.data && props.data.length > 0 && (
        <table className="targettable">
          <thead>
            <tr>
              <th
                onClick={() => onHeaderClick()}
                title={hide ? "Göster" : "Gizle"}
              >
                {props.header} [{props.data.length}]
              </th>
            </tr>
          </thead>
          <tbody style={{ display: hide ? "none" : "" }}>
            {props.data.map((hedef) => (
              <tr
                onClick={(e) => onRowSelect(e, hedef)}
                key={hedef.targetType + "-" + hedef.targetValue}
              >
                <td>{hedef.targetValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
});

export default HedefListesiTable;
