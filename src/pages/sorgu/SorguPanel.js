import { useState } from "react";
import "./SorguPanel.css";
import SorguSagPanel from "./sag/SorguSagPanel";
import SorguSolPanel from "./sol/SorguSolPanel";

export const SorguTipi = [
  {
    id: 1,
    name: "Konum",
  }, {
    id: 2,
    name: "Bazlar",
  }, {
    id: 3,
    name: "Koordinat",
  }, {
    id: 4,
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
