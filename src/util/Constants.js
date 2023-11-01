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
}

//**********************  LEAFLET CONSTANTS  **********************/
export class LeafletConstants {
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
    [OperatorTipi[0], "red"], // AVEA
    [OperatorTipi[1], "yellow"], // TURKCELL
    [OperatorTipi[2], "MediumBlue"], // VODAFONE
  ]);

  static BAZ_ANGLE_RANGE = 32;
  static BAZ_RADIUS = 200;

  static defaultPathOptions = {
    fillColor: LeafletConstants.AREA_COLOR,
    fillOpacity: LeafletConstants.AREA_OPACITY,
    color: LeafletConstants.AREA_COLOR,
    weight: LeafletConstants.BORDER_WEIGHT,
  };

  static aveaBazListeOptions = {
    fillColor: LeafletConstants.AVEA_BAZ_COLOR,
    fillOpacity: LeafletConstants.AREA_OPACITY,
    color: "black",
    weight: LeafletConstants.BORDER_WEIGHT,
  };

  static turkcellBazListeOptions = {
    fillColor: LeafletConstants.TURKCELL_BAZ_COLOR,
    fillOpacity: LeafletConstants.AREA_OPACITY,
    color: "black",
    weight: LeafletConstants.BORDER_WEIGHT,
  };

  static vodafoneBazListeOptions = {
    fillColor: LeafletConstants.VODAFONE_BAZ_COLOR,
    fillOpacity: LeafletConstants.AREA_OPACITY,
    color: "black",
    weight: LeafletConstants.BORDER_WEIGHT,
  };
}
