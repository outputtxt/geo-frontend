import { useState, useEffect, useContext } from "react";
import SorguTipi from "../../../model/enum/SorguTipi";
import { MapContext } from "../../../util/context/Context";
import KonumSorguPanel from "./konum/KonumSorguPanel";
import BazSorguPanel from "./baz/BazSorguPanel";
import KoordinatSorguPanel from "./koordinat/KoordinatSorguPanel";
import KestirmeSorguPanel from "./kestirme/KestirmeSorguPanel";
import "./SorguSolPanel.css";

const SorguSolPanel = ({
  setContentData,
  setContentHeader,
  setContentOpen,
}) => {
  const [active, setActive] = useState(SorguTipi[0].name);
  const { map, featureGroupRef } = useContext(MapContext);

  useEffect(() => {
    if (map != null) {
      featureGroupRef.clearLayers();
    }
  }, [active]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="sorgu-sol-tab-group">
        {SorguTipi.map((item) => (
          <button
            type="button"
            className={
              active === item.name
                ? "sorgu-sol-tab sorgu-sol-tab-active"
                : "sorgu-sol-tab"
            }
            key={item.name}
            onClick={() => setActive(item.name)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="sorgu-sol-content">
        <div style={{ display: active === SorguTipi[0].name ? "" : "none" }}>
          <KonumSorguPanel
            setContentData={setContentData}
            setContentHeader={setContentHeader}
            setContentOpen={setContentOpen}
          />
        </div>
        <div style={{ display: active === SorguTipi[1].name ? "" : "none" }}>
          <BazSorguPanel />
        </div>
        <div style={{ display: active === SorguTipi[2].name ? "" : "none" }}>
          <KoordinatSorguPanel />
        </div>
        <div style={{ display: active === SorguTipi[3].name ? "" : "none" }}>
          <KestirmeSorguPanel />
        </div>
      </div>
    </div>
  );
};

export default SorguSolPanel;
