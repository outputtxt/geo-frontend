import { useContext } from "react";
import { MapContext } from "../util/context/Context";
import { LeafletConstants } from "../util/Constants";
import BazSorguRestService from "./rest/BazSorguRestService";
import * as L from "leaflet";
import "leaflet.sector"; // one time import is enough for all L usages
// import "leaflet-ellipse";
import "../util/l.ellipse"; // one time import is enough for all L usages

export const useBazSorguService = () => {
  const mapContext = useContext(MapContext);

  const bazSorgu = (operator, cellId) => {
    mapContext.layerSorgu.clearLayers();

    const response = BazSorguRestService.cellSorgula(operator, cellId);
    console.log(response);

    if (response.angle == 0) {
      L.circle(
        [response.bazX, response.bazY],
        LeafletConstants.BAZ_RADIUS,
        LeafletConstants.defaultPathOptions,
      ).addTo(mapContext.layerSorgu);
    } else {
      L.sector({
        center: [response.bazX, response.bazY],
        innerRadius: parseFloat(0),
        outerRadius: parseFloat(LeafletConstants.BAZ_RADIUS),
        startBearing: parseFloat(
          response.angle - LeafletConstants.BAZ_ANGLE_RANGE,
        ),
        endBearing: parseFloat(
          response.angle + LeafletConstants.BAZ_ANGLE_RANGE,
        ),
        fillColor: LeafletConstants.AREA_COLOR,
        fillOpacity: LeafletConstants.AREA_OPACITY,
        color: LeafletConstants.AREA_COLOR,
        weight: LeafletConstants.BORDER_WEIGHT,
      }).addTo(mapContext.layerSorgu);
    }

    // BAZ MARKER
    L.marker([response.bazX, response.bazY], {
      icon: LeafletConstants.BazIcon,
    }).addTo(mapContext.layerSorgu);

    mapContext.map.fitBounds(mapContext.layerSorgu.getBounds().pad(0.5));
  };

  return { bazSorgu };
};

export default useBazSorguService;
