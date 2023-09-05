import { useState } from "react";
import "./SorguPanel.css";
import SorguSagPanel from "./sag/SorguSagPanel";
import SorguSolPanel from "./sol/SorguSolPanel";

export const SorguTipi = [
  {
    id: 0,
    name: "Konum",
  }, {
    id: 1,
    name: "Bazlar",
  }, {
    id: 2,
    name: "Koordinat",
  }, {
    id: 3,
    name: "Kestirme",
  }
];

const SorguPanel = () => {
  const [sorguMenuOpen, setSorguMenuOpen] = useState(true);

  return (
    <div className="sorgu-container">
      <div
        className={
          sorguMenuOpen ? "sorgu-column-left" : "sorgu-column-left-hidden"
        }
      >
        <SorguSolPanel />
      </div>
      <div className="sorgu-column-right">
        <SorguSagPanel
          sorguMenuOpen={sorguMenuOpen}
          setSorguMenuOpen={setSorguMenuOpen}
        />
      </div>
    </div>
  );
};

export default SorguPanel;
