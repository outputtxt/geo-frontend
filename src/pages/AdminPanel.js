import { useState } from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [open, setOpen] = useState(true);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="container">
      <div className="header">Başlık</div>
      <div className="map">
        <h1>CONTENT</h1>
        ea of denouncing pleasure and praising pain was born and I will give you
        a complete account of the system, and expound the actual teachings of
        the great explorer of the truth, the master-builder of human happiness.
        No one rejects, dislikes, or avoids pleasure itself, because it is
        pleasure, but because those who do not know how to pursue pleasure
        rationally encounter consequences that are extremely painful. Nor again
        is there anyone who loves or pursues or desires to obtain pain of
        itself, because it is pain, but because occasionally circumstances occur
        in which toil and pain can procure him some great pleasure. To take a
        trivial example, which of us ever undertakes laborious physical
        exercise, except to obtain some advantage from it? But who has any right
        to find fault with a man who chooses to enjoy a pleasure that has no
        annoying consequences
      </div>
      <div className="header">
        <div className="left">Başlık 2</div>
        <div className="header-right">
          <button className="button-36" onClick={toggleOpen}>
            {open ? (
              <KeyboardDoubleArrowDownIcon />
            ) : (
              <KeyboardDoubleArrowUpIcon />
            )}
          </button>
        </div>
      </div>
      <div className={open ? "content" : "content-hidden"}>
        <h1>CONTENT</h1>
        ea of denouncing pleasure and praising pain was born and I will give you
        a complete account of the system, and expound the actual teachings of
        the great explorer of the truth, the master-builder of human happiness.
        No one rejects, dislikes, or avoids pleasure itself, because it is
        pleasure, but because those who do not know how to pursue pleasure
        rationally encounter consequences that are extremely painful. Nor again
        is there anyone who loves or pursues or desires to obtain pain of
        itself, because it is pain, but because occasionally circumstances occur
        in which toil and pain can procure him some great pleasure. To take a
        trivial example, which of us ever undertakes laborious physical
        exercise, except to obtain some advantage from it? But who has any right
        to find fault with a man who chooses to enjoy a pleasure that has no
        annoying consequences
      </div>
    </div>
  );
};

export default AdminPanel;
