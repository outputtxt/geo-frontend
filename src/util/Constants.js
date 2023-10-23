import * as L from "leaflet";
import bazIconPng from "../img/radio-tower-icon-14-256.png";

export const LATITUDE_REGEX =
  /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;
export const LONGITUDE_REGEX =
  /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;

// Leaflet Default Max Zoom Level = 18
export const MAX_ZOOM = 18;

export const MAP_START_X = 39.925018;
export const MAP_START_Y = 32.836956;

//**********************  LEAFLET CONSTANTS  **********************/
export const BazIcon = L.icon({
  iconUrl: bazIconPng,

  iconSize: [40, 48], // size of the icon
  iconAnchor: [20, 24], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

export const AREA_OPACITY = 0.3;
export const AREA_COLOR = "orange";
export const AVEA_BAZ_COLOR = "red";
export const TURKCELL_BAZ_COLOR = "yellow";
export const VODAFONE_BAZ_COLOR = "purple";
