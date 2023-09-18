import { useState } from "react";
import { SorguTipi } from "../../../util/Constants";
import KonumSorguPanel from "./konum/KonumSorguPanel";
import BazSorguPanel from "./baz/BazSorguPanel";
import KoordinatSorguPanel from "./koordinat/KoordinatSorguPanel";
import KestirmeSorguPanel from "./kestirme/KestirmeSorguPanel";
import "./SorguSolPanel.css";

const SorguSolPanel = () => {
  const [active, setActive] = useState(SorguTipi[0].name);

  const getSorguPanel = () => {
    if (!active) {
      return <p>Boş Sorgu Seçimi</p>;
    }

    switch (active) {
      case SorguTipi[0].name:
        return <KonumSorguPanel />;
      case SorguTipi[1].name:
        return <BazSorguPanel />;
      case SorguTipi[2].name:
        return <KoordinatSorguPanel />;
      case SorguTipi[3].name:
        return <KestirmeSorguPanel />;
      default:
        return <p> Your payment selection: {active} </p>;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="sorgu-sol-tab-group">
        {SorguTipi.map((item) => (
          <button
            className={
              active === item.name
                ? "sorgu-sol-tab sorgu-sol-tab-active"
                : "sorgu-sol-tab"
            }
            key={item.name}
            onClick={() => setActive(item.name)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="sorgu-sol-content">{getSorguPanel()}</div>
    </div>
  );
};

export default SorguSolPanel;

//// SAMPLE STYLED button
// import styled from "styled-components";
//
// const Tab = styled.button`
//   font-size: 16px;
//   flex: 1;
// //   padding: 10px 60px;
//   cursor: pointer;
//   opacity: 0.6;
//   background: white;
//   border: 1px solid orange;
// //   outline: 0;
//   ${({ active }) =>
//     active &&
//     `
//     border-bottom: 2px solid black;
//     opacity: 1;
//   `}
// `;
