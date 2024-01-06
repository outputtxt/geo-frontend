import { useContext } from "react";
import { MapContext, ContentContext } from "../util/Context";
import { useSnapshot } from "valtio";
import { authInfoStore } from "../util/CoreStore";
import Constants from "../util/Constants";
import { showError } from "../components/CustomDialog";
import BazSorguRestService from "./rest/BazSorguRestService";
import OperatorTipi from "../model/enum/OperatorTipi";
import * as L from "leaflet";
import "leaflet.sector"; // one time import is enough for all L usages
// import "leaflet-ellipse";
import "../util/l.ellipse"; // one time import is enough for all L usages

export const useBazSorguService = () => {
  const { jwtToken } = useSnapshot(authInfoStore);
  const mapContext = useContext(MapContext);
  const { setContentHeader, setContentOpen, setContentData } =
    useContext(ContentContext);

  const mapFocus = (X, Y) => {
    try {
      mapContext.map.setView([X, Y], Constants.MAX_ZOOM - 3);
    } catch (err) {
      console.log(err.message);
    }
  };

  //=========================  BAZ SORGU  =========================
  const bazSorgu = async (operator, cellId) => {
    mapContext.layerSorgu.clearLayers();

    const response = await BazSorguRestService.cellSorgula(
      mapFocus,
      operator,
      cellId,
      jwtToken,
    );
    console.log(response);

    if (response == null || response instanceof Promise) {
      showError("Baz Sorgu uygulamaya bağlanamadı!");
      return;
    } else if (response.responseCode != "SUCCESS") {
      showError(response.responseMessage);
      return;
    }

    if (response.baseStationDetail.location.angle == 0) {
      L.circle(
        [
          response.baseStationDetail.location.latitude,
          response.baseStationDetail.location.longitude,
        ],
        Constants.BAZ_RADIUS,
        Constants.defaultPathOptions,
      ).addTo(mapContext.layerSorgu);
    } else {
      L.sector({
        center: [
          response.baseStationDetail.location.latitude,
          response.baseStationDetail.location.longitude,
        ],
        innerRadius: parseFloat(0),
        outerRadius: parseFloat(Constants.BAZ_RADIUS),
        startBearing: parseFloat(
          response.baseStationDetail.location.angle - Constants.BAZ_ANGLE_RANGE,
        ),
        endBearing: parseFloat(
          response.baseStationDetail.location.angle + Constants.BAZ_ANGLE_RANGE,
        ),
        fillColor: Constants.AREA_COLOR,
        fillOpacity: Constants.AREA_OPACITY,
        color: Constants.AREA_COLOR,
        weight: Constants.BORDER_WEIGHT,
      }).addTo(mapContext.layerSorgu);
    }

    // BAZ MARKER
    L.marker(
      [
        response.baseStationDetail.location.latitude,
        response.baseStationDetail.location.longitude,
      ],
      {
        icon: Constants.BazIcon,
      },
    ).addTo(mapContext.layerSorgu);

    try {
      mapContext.map.fitBounds(mapContext.layerSorgu.getBounds().pad(0.5));
    } catch (err) {
      console.log(err.message);
    }

    // SET CONTENT TABLE
    setContentHeader("Baz İstasyonu Bilgileri");
    setContentData(response.getTable());
    setContentOpen(true);
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
