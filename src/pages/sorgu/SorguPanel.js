import SorguMenu from "./menu/SorguMenu";
import "./sorguPanel.css";

export default function SorguPanel() {
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
        id="left"
        style={{
          display: "flex",
        }}
      >
        <SorguMenu />
      </div>
      <div id="right">
        <div id="top">
          <h2>Sorgu Panel BAR</h2>
        </div>
        <div id="bottom">
          <br />
          <br />
          <br /> content
        </div>
      </div>
    </div>
  );
}
