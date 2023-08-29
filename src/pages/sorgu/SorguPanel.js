import { useState } from "react";
import "./SorguPanel.css";
import SorguSagPanel from "./SorguSagPanel";

const sorguTipi = [
  {
    id: 1,
    name: "Konum",
  },
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
        LEFT
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
