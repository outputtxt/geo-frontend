export const SorguTipi = [
  {
    id: 0,
    name: "Konum",
  }, {
    id: 1,
    name: "Bazlar",
  }, {
    id: 2,
    name: "Koordinat",
  }, {
    id: 3,
    name: "Kestirme",
  }
];

export const Operator = [
    "Avea", 
    "Turkcell", 
    "Vodafone"
];

export const LATITUDE_REGEX = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;
export const LONGITUDE_REGEX = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;
