import { useState } from "react";
import "./SorguPanel.css";
import SorguSagPanel from "./sag/SorguSagPanel";
import SorguSolPanel from "./sol/SorguSolPanel";

const SorguPanel = () => {
  const [sorguMenuOpen, setSorguMenuOpen] = useState(true);
  const [contentData, setContentData] = useState();
  const [contentHeader, setContentHeader] = useState("Test Başlk 2");
  const [contentOpen, setContentOpen] = useState(false);

  return (
    <div className="sorgu-container">
      <div
        className={
          sorguMenuOpen ? "sorgu-column-left" : "sorgu-column-left-hidden"
        }
      >
        <SorguSolPanel
          setContentData={setContentData}
          setContentHeader={setContentHeader}
          setContentOpen={setContentOpen}
        />
      </div>
      <div className="sorgu-column-right">
        <SorguSagPanel
          sorguMenuOpen={sorguMenuOpen}
          setSorguMenuOpen={setSorguMenuOpen}
          contentData={contentData}
          contentHeader={contentHeader}
          contentOpen={contentOpen}
        />
      </div>
    </div>
  );
};

export default SorguPanel;
