import { useState, useContext, useEffect } from "react";
import SorguTipi from "../../../model/enum/SorguTipi";
import { MapContext, ContentContext } from "../../../util/Context";
import KonumSorguPanel from "./konum/KonumSorguPanel";
import BazSorguPanel from "./baz/BazSorguPanel";
import KoordinatSorguPanel from "./koordinat/KoordinatSorguPanel";
import KestirmeSorguPanel from "./kestirme/KestirmeSorguPanel";
import "./SorguSolPanel.css";

const SorguSolPanel = () => {
  const { map, layerSorgu } = useContext(MapContext);
  const { setContentOpen } = useContext(ContentContext);
  const [active, setActive] = useState(SorguTipi[0].name);

  useEffect(() => {
    if (map != null) {
      layerSorgu.clearLayers();
    }

    // if (active != SorguTipi[0].name) {
    setContentOpen(false);
    // }
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
          <KonumSorguPanel />
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
