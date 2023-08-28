import { useState } from "react";
import "./Collapsible.css";
import KeyboardDoubleArrowUp from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDown from "@mui/icons-material/KeyboardDoubleArrowDown";

const Collapsible = (props) => {
  const [open, setOPen] = useState(false);

  const toggle = () => {
    setOPen(!open);
  };

  return (
    <div>
      <div className="collapsible-header">
        <div>{props.label}</div>
        <button onClick={toggle} className="menuBtn">
          {open ? <KeyboardDoubleArrowDown /> : <KeyboardDoubleArrowUp />}
        </button>
      </div>

      <div className={open ? "content-show" : "content-parent"}>
        <div className="content"> {props.children} </div>
      </div>
    </div>
  );
};

export default Collapsible;
