import { useState, useEffect, useContext } from "react";
import { SorguTipi } from "../../../util/Constants";
import { MapContext } from "../../../util/context/Context";
import KonumSorguPanel from "./konum/KonumSorguPanel";
import BazSorguPanel from "./baz/BazSorguPanel";
import KoordinatSorguPanel from "./koordinat/KoordinatSorguPanel";
import KestirmeSorguPanel from "./kestirme/KestirmeSorguPanel";
import { getHedefListesi } from "../../../service/rest/HedefListesiService";
import "./SorguSolPanel.css";

const SorguSolPanel = () => {
  const [active, setActive] = useState(SorguTipi[0].name);

  const { map, featureGroupRef } = useContext(MapContext);

  useEffect(() => {
    console.log("\n\nSORGU SOL PANEL CHANGED\n\n");
    getHedefListesi();
  }, []);

  useEffect(() => {
    if (map != null) {
      featureGroupRef.clearLayers();
    }
  }, [active]);

  const getSorguPanel = () => {
    if (!active) {
      return <p>Boş Sorgu Seçimi</p>;
    }

    switch (active) {
      case SorguTipi[0].name:
        return <KonumSorguPanel />;
      case SorguTipi[1].name:
        return <BazSorguPanel />;
      case SorguTipi[2].name:
        return <KoordinatSorguPanel />;
      case SorguTipi[3].name:
        return <KestirmeSorguPanel />;
      default:
        return <p> Empty Panel: {active} </p>;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="sorgu-sol-tab-group">
        {SorguTipi.map((item) => (
          <button
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
      <div className="sorgu-sol-content">{getSorguPanel()}</div>
    </div>
  );
};

export default SorguSolPanel;
