import * as L from "leaflet";
import bazIconPng from "../img/radio-tower-icon-14-256.png";
import OperatorTipi from "../model/enum/OperatorTipi";

export default class Constants {
  static LATITUDE_REGEX =
    /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;
  static LONGITUDE_REGEX =
    /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;

  // Leaflet Default Max Zoom Level = 18
  static MAX_ZOOM = 18;

  static MAP_START_X = 39.925018;
  static MAP_START_Y = 32.836956;

  static BazIcon = L.icon({
    iconUrl: bazIconPng,

    iconSize: [30, 36], // size of the icon
    iconAnchor: [15, 18], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  static AREA_OPACITY = 0.3;
  static AREA_COLOR = "orange";
  static BORDER_WEIGHT = 0.4;

  static AVEA_BAZ_COLOR = "red";
  static TURKCELL_BAZ_COLOR = "yellow";
  static VODAFONE_BAZ_COLOR = "MediumBlue";

  static OPERATOR_BAZ_COLOR_MAP = new Map([
    [OperatorTipi[0], Constants.AVEA_BAZ_COLOR], // AVEA
    [OperatorTipi[1], Constants.TURKCELL_BAZ_COLOR], // TURKCELL
    [OperatorTipi[2], Constants.VODAFONE_BAZ_COLOR], // VODAFONE
  ]);

  static BAZ_ANGLE_RANGE = 32;
  static BAZ_RADIUS = 200;

  static defaultPathOptions = {
    fillColor: Constants.AREA_COLOR,
    fillOpacity: Constants.AREA_OPACITY,
    color: Constants.AREA_COLOR,
    weight: Constants.BORDER_WEIGHT,
  };

  static aveaBazListeOptions = {
    fillColor: Constants.AVEA_BAZ_COLOR,
    fillOpacity: Constants.AREA_OPACITY,
    color: "black",
    weight: Constants.BORDER_WEIGHT,
  };

  static turkcellBazListeOptions = {
    fillColor: Constants.TURKCELL_BAZ_COLOR,
    fillOpacity: Constants.AREA_OPACITY,
    color: "black",
    weight: Constants.BORDER_WEIGHT,
  };

  static vodafoneBazListeOptions = {
    fillColor: Constants.VODAFONE_BAZ_COLOR,
    fillOpacity: Constants.AREA_OPACITY,
    color: "black",
    weight: Constants.BORDER_WEIGHT,
  };
}
