import { useContext } from "react";
import { MapContext } from "../util/context/Context";
import Constants from "../util/Constants";
import BazSorguRestService from "./rest/BazSorguRestService";
import OperatorTipi from "../model/enum/OperatorTipi";
import * as L from "leaflet";
import "leaflet.sector"; // one time import is enough for all L usages
// import "leaflet-ellipse";
import "../util/l.ellipse"; // one time import is enough for all L usages

export const useBazSorguService = () => {
  const mapContext = useContext(MapContext);

  //=========================  BAZ SORGU  =========================
  const bazSorgu = (operator, cellId) => {
    mapContext.layerSorgu.clearLayers();

    const response = BazSorguRestService.cellSorgula(operator, cellId);
    console.log(response);

    if (response.angle == 0) {
      L.circle(
        [response.bazX, response.bazY],
        Constants.BAZ_RADIUS,
        Constants.defaultPathOptions,
      ).addTo(mapContext.layerSorgu);
    } else {
      L.sector({
        center: [response.bazX, response.bazY],
        innerRadius: parseFloat(0),
        outerRadius: parseFloat(Constants.BAZ_RADIUS),
        startBearing: parseFloat(response.angle - Constants.BAZ_ANGLE_RANGE),
        endBearing: parseFloat(response.angle + Constants.BAZ_ANGLE_RANGE),
        fillColor: Constants.AREA_COLOR,
        fillOpacity: Constants.AREA_OPACITY,
        color: Constants.AREA_COLOR,
        weight: Constants.BORDER_WEIGHT,
      }).addTo(mapContext.layerSorgu);
    }

    // BAZ MARKER
    L.marker([response.bazX, response.bazY], {
      icon: Constants.BazIcon,
    }).addTo(mapContext.layerSorgu);

    try {
      mapContext.map.fitBounds(mapContext.layerSorgu.getBounds().pad(0.5));
    } catch (err) {
      console.log(err.message);
    }
  };

  //=========================  BAZ SORGU  =========================
  const bazListeGoster = (operator, isChecked) => {
    var bazListeLayer;
    var pathOptions;

    if (OperatorTipi[0] === operator) {
      bazListeLayer = mapContext.layerAveaBazList;
      pathOptions = Constants.aveaBazListeOptions;
    } else if (OperatorTipi[1] === operator) {
      bazListeLayer = mapContext.layerTurkcellBazList;
      pathOptions = Constants.turkcellBazListeOptions;
    } else if (OperatorTipi[2] === operator) {
      bazListeLayer = mapContext.layerVodafoneBazList;
      pathOptions = Constants.vodafoneBazListeOptions;
    }

    // if unchecked, then clean operator baz liste layer
    if (!isChecked) {
      bazListeLayer.clearLayers();
      return;
    }

    // else if checked, then get operator baz liste and add to map
    var bazColor = Constants.OPERATOR_BAZ_COLOR_MAP.get(operator);
    var cellLocationListe = BazSorguRestService.bazListeSorgula(operator);

    cellLocationListe.map((cellLocation) => {
      if (cellLocation.angle == 0) {
        L.circle(
          [cellLocation.X, cellLocation.Y],
          Constants.BAZ_RADIUS,
          pathOptions,
        ).addTo(bazListeLayer);
      } else {
        L.sector({
          center: [cellLocation.X, cellLocation.Y],
          innerRadius: parseFloat(0),
          outerRadius: parseFloat(Constants.BAZ_RADIUS),
          startBearing: parseFloat(
            cellLocation.angle - Constants.BAZ_ANGLE_RANGE,
          ),
          endBearing: parseFloat(
            cellLocation.angle + Constants.BAZ_ANGLE_RANGE,
          ),
          fillColor: bazColor,
          fillOpacity: Constants.AREA_OPACITY,
          color: "black",
          weight: Constants.BORDER_WEIGHT,
        }).addTo(bazListeLayer);
      }

      // BAZ CENTER POINT
      L.circle([cellLocation.X, cellLocation.Y], 2, {
        fillColor: bazColor,
        fillOpacity: 1,
        color: bazColor,
      }).addTo(bazListeLayer);
    });

    try {
      mapContext.map.fitBounds(bazListeLayer.getBounds());
    } catch (err) {
      console.log(err.message);
    }
  };

  return { bazSorgu, bazListeGoster };
};

export default useBazSorguService;
