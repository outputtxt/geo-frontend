import { useContext } from "react";
import { MapContext } from "../util/context/Context";
import * as L from "leaflet";
import { LeafletConstants } from "../util/Constants";

export const useMapService = () => {
  // MAP from Context
  const { map, featureGroupRef } = useContext(MapContext);

  const drawBaz = (
    bazX,
    bazY,
    angle,
    adres,
    color = LeafletConstants.AREA_COLOR,
  ) => {
    if (angle == 0) {
      L.circle([bazX, bazY], LeafletConstants.BAZ_RADIUS, {
        fillColor: color,
        fillOpacity: LeafletConstants.AREA_OPACITY,
        color: color,
        weight: LeafletConstants.BORDER_WEIGHT,
      }).addTo(featureGroupRef);
    } else {
      L.sector({
        center: [bazX, bazY],
        innerRadius: parseFloat(0),
        outerRadius: parseFloat(LeafletConstants.BAZ_RADIUS),
        startBearing: parseFloat(angle - LeafletConstants.BAZ_ANGLE_RANGE),
        endBearing: parseFloat(angle + LeafletConstants.BAZ_ANGLE_RANGE),
        fillColor: color,
        fillOpacity: LeafletConstants.AREA_OPACITY,
        color: color,
        weight: LeafletConstants.BORDER_WEIGHT,
      }).addTo(featureGroupRef);
    }

    // BAZ CENTER POINT
    L.circle([bazX, bazY], 2, {
      fillColor: color,
      fillOpacity: 1,
      color: color,
    }).addTo(featureGroupRef);
  };

  return { drawBaz };
};

export default useMapService;

// export const useDrawBaz = (
//   bazX,
//   bazY,
//   angle,
//   adres,
//   color = LeafletConstants.AREA_COLOR,
//   opacity = LeafletConstants.AREA_OPACITY,
// ) => {
//   // MAP from Context
//   const { map, featureGroupRef } = useContext(MapContext);

//   if (angle == 0) {
//     L.circle([bazX, bazY], LeafletConstants.BAZ_RADIUS, {
//       fillColor: color,
//       fillOpacity: opacity,
//       color: color,
//     }).addTo(featureGroupRef);
//   } else {
//     L.sector({
//       center: [response.bazX, response.bazY],
//       innerRadius: parseFloat(0),
//       outerRadius: parseFloat(LeafletConstants.BAZ_RADIUS),
//       startBearing: parseFloat(
//         response.angle - LeafletConstants.BAZ_ANGLE_RANGE,
//       ),
//       endBearing: parseFloat(response.angle + LeafletConstants.BAZ_ANGLE_RANGE),
//       fillColor: LeafletConstants.AREA_COLOR,
//       fillOpacity: LeafletConstants.AREA_OPACITY,
//       color: LeafletConstants.AREA_COLOR,
//     }).addTo(featureGroupRef);
//   }

//   return null;
// };
