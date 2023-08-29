import { useEffect } from "react";
import Collapsible from "../../../components/Collapsible";
import Leaflet from "./leaflet/Leaflet";
import ContainerDimensions from "react-container-dimensions";

const HaritaPanel = ({ selectedSorgu }) => {
  return (
    <div style={{ border: "100px", borderColor: "red" }}>
      <ContainerDimensions>
        {({ height, width }) => <Leaflet height={height} width={width} />}
      </ContainerDimensions>

      <Collapsible label="Introduction">
        <h1>Goals</h1>
        <p style={{ backgroundColor: "white" }}>
          This article will teach you more about the useState hook, useRef hook,
          and animation in React; we will make simple React collapsible
          components, useful for all kinds of apps. This collapsible element can
          be shown or hidden by clicking a button.
        </p>
      </Collapsible>
    </div>
  );
};

export default HaritaPanel;
