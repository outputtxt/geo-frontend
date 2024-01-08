import { useState, useContext, useEffect } from "react";
import { useSnapshot } from "valtio";
import { authInfoStore, contentStore } from "../../../util/CoreStore";
import SorguTipi from "../../../model/enum/SorguTipi";
import { MapContext } from "../../../util/Context";
import KonumSorguPanel from "./konum/KonumSorguPanel";
import BazSorguPanel from "./baz/BazSorguPanel";
import KoordinatSorguPanel from "./koordinat/KoordinatSorguPanel";
import KestirmeSorguPanel from "./kestirme/KestirmeSorguPanel";
import "./SorguSolPanel.css";
import { canKonumSorgu } from "../../../model/enum/RoleTipi";

const SorguSolPanel = () => {
  const { map, layerSorgu } = useContext(MapContext);
  const { role } = useSnapshot(authInfoStore);
  const [active, setActive] = useState(
    SorguTipi[canKonumSorgu(role) ? 0 : 1].name,
  );

  useEffect(() => {
    if (map != null) {
      layerSorgu.clearLayers();
    }

    // if (active != SorguTipi[0].name) {
    contentStore.contentOpen = false;
    // }
  }, [active]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingLeft: "7px",
        paddingRight: "5px",
        marginTop: "2px",
      }}
    >
      <div className="sorgu-sol-tab-group">
        {SorguTipi.filter((item) =>
          item.name === "Konum" ? canKonumSorgu(role) : true,
        ).map((item) => (
          <button
            type="button"
            className={
              active === item.name
                ? "sorgu-sol-tab sorgu-sol-tab-active"
                : "sorgu-sol-tab"
            }
            style={{ height: "36px" }}
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
