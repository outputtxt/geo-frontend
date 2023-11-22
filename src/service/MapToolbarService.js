import { useContext } from "react";
import { MapContext, ContentContext } from "../util/Context";
import Constants from "../util/Constants";
import * as L from "leaflet";

export const useMapToolbarService = () => {
  const mapContext = useContext(MapContext);
  const contentContext = useContext(ContentContext);

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

    // set content panel to closed
    contentContext.setContentOpen(false);
  };

  //=========================  RESET MAP  =========================
  const changeDraggable = (draggable) => {
    if (mapContext.map != null) {
      if (draggable) {
        mapContext.map.dragging.enable();
      } else {
        mapContext.map.dragging.disable();
      }
    }
  };

  return { resetMap, changeDraggable };
};

export default useMapToolbarService;
