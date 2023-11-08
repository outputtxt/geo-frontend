import { useContext } from "react";
import { MapContext } from "../util/Context";
import Constants from "../util/Constants";
import * as L from "leaflet";

export const useMapToolbarService = () => {
  const mapContext = useContext(MapContext);

  //=========================  RESET MAP  =========================
  const resetMap = () => {
    // cleaer layers
    mapContext.layerSorgu.clearLayers();
    mapContext.layerKestirme.clearLayers();
    mapContext.layerAveaBazList.clearLayers();
    mapContext.layerTurkcellBazList.clearLayers();
    mapContext.layerVodafoneBazList.clearLayers();

    // clear baz liste checkboxes
    const aveaCheckbox = document.getElementById("AveaBazListCheckbox");
    aveaCheckbox.checked = false;
    const turkcellCheckbox = document.getElementById("TurkcellBazListCheckbox");
    turkcellCheckbox.checked = false;
    const vodafoneCheckbox = document.getElementById("VodafoneBazListCheckbox");
    vodafoneCheckbox.checked = false;

    // set map to its initial state
    mapContext.map.setView(
      [Constants.MAP_START_X, Constants.MAP_START_Y],
      Constants.MAX_ZOOM - 4,
    );
  };

  return { resetMap };
};

export default useMapToolbarService;
