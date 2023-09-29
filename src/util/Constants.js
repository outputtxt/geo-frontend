import * as L from "leaflet";
import bazIconPng from "../img/radio-tower-icon-14-256.png";

export const SorguTipi = [
  {
    id: 0,
    name: "Konum",
  },
  {
    id: 1,
    name: "Bazlar",
  },
  {
    id: 2,
    name: "Koordinat",
  },
  {
    id: 3,
    name: "Kestirme",
  },
];

export const Operator = ["Avea", "Turkcell", "Vodafone"];

export const LATITUDE_REGEX =
  /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;
export const LONGITUDE_REGEX =
  /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;

// Leaflet Default Max Zoom Level = 18
export const MAX_ZOOM = 18;

//**********************  LEAFLET CONSTANTS  **********************/
export const BazIcon = L.icon({
  iconUrl: bazIconPng,

  iconSize: [40, 48], // size of the icon
  iconAnchor: [20, 24], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});
