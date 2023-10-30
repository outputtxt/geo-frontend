import { useSnapshot } from "valtio";
import { MapProxy } from "../util/context/Context";
import { LeafletConstants } from "../util/Constants";
import * as L from "leaflet";
import "leaflet.sector";  // one time import is enough for all L usages
// import "leaflet-ellipse";
import "../util/l.ellipse"; // one time import is enough for all L usages


export const useMapService = () => {

  const mapState = useSnapshot(MapProxy);

  const drawBaz = (
    bazListeLayer,
    bazX,
    bazY,
    angle,
    adres,
    color = LeafletConstants.AREA_COLOR
  ) => {
    if (angle == 0) {
      L.circle([bazX, bazY], LeafletConstants.BAZ_RADIUS, {
        fillColor: color,
        fillOpacity: LeafletConstants.AREA_OPACITY,
        color: "black",
        weight: LeafletConstants.BORDER_WEIGHT,
      }).addTo(bazListeLayer);
    } else {
      L.sector({
        center: [bazX, bazY],
        innerRadius: parseFloat(0),
        outerRadius: parseFloat(LeafletConstants.BAZ_RADIUS),
        startBearing: parseFloat(angle - LeafletConstants.BAZ_ANGLE_RANGE),
        endBearing: parseFloat(angle + LeafletConstants.BAZ_ANGLE_RANGE),
        fillColor: color,
        fillOpacity: LeafletConstants.AREA_OPACITY,
        color: "black",
        weight: LeafletConstants.BORDER_WEIGHT,
      }).addTo(bazListeLayer);
    }

    // BAZ CENTER POINT
    L.circle([bazX, bazY], 2, {
      fillColor: color,
      fillOpacity: 1,
      color: color,
    }).addTo(bazListeLayer);
  };

  return { drawBaz };
};

export default useMapService;
