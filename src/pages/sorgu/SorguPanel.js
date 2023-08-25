import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useState } from "react";
import SorguMenu from "./menu/SorguMenu";
import HaritaPanel from "./harita/HaritaPanel";
import "./sorguPanel.css";

const SorguPanel = () => {
  const [open, setOpen] = useState(true);
  const openWidth = "300px";
  const closedWidth = "25px";

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div
      id="container"
      style={{
        display: "flex",
        margin: 0,
        padding: 0,
      }}
    >
      <div
        id="container"
        style={{
          borderLeft: "1px solid white",
          borderRight: "1px solid white",
        }}
      >
        <div id="top" style={{ width: open ? openWidth : closedWidth }}>
          <table width={"100%"}>
            <thead>
              <tr>
                {open && (
                  <th width="90%" style={{ width: "90%", paddingLeft: "60px" }}>
                    Sorgu Panel
                  </th>
                )}

                <th width="10%">
                  {" "}
                  <button onClick={toggleOpen} className="menuBtn">
                    {open ? (
                      <KeyboardDoubleArrowLeftIcon />
                    ) : (
                      <KeyboardDoubleArrowRightIcon />
                    )}
                  </button>
                </th>
              </tr>
            </thead>
          </table>
        </div>

        <div>{open ? <SorguMenu /> : <div id="bottom" />}</div>
      </div>
      <div id="right">
        <HaritaPanel fullScreen={open} selectedSorgu={5} />
      </div>
    </div>
  );
};

export default SorguPanel;
