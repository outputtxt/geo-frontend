import { useState } from "react";
import "./sorguPanel.css";

const SorguPanel = () => {
  const [open, setOpen] = useState(true);
  const openWidth = "300px";
  
  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>> CONTENT SORGU YENI
    </div>
  );
};

export default SorguPanel;
