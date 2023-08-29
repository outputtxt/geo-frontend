import { useState } from "react";
import "./sorguPanel.css";

const SorguPanel = () => {
  const [open, setOpen] = useState(true);
  const openWidth = "300px";

  const toggleOpen = () => {
    setOpen(!open);
  };

  return <div>> CONTENT SORGU OLD</div>;
};

export default SorguPanel;
