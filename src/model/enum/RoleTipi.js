const RoleTipi = [
  "ROLE_ADMIN",
  "ROLE_QUERY_ADMIN",
  "ROLE_LEA_QUERY_ADMIN",
  "ROLE_ADLI_ADMIN",
  "ROLE_ONLEYICI_ADMIN",
  "ROLE_ADLI",
  "ROLE_ONLEYICI",
];

//=================================================================
export const QUERY_GRUP = [
  "ROLE_ADMIN",
  "ROLE_QUERY_ADMIN",
  "ROLE_LEA_QUERY_ADMIN",
  "ROLE_ADLI",
  "ROLE_ONLEYICI",
];

export const canQuery = (role) => {
  return QUERY_GRUP.includes(role);
};

//=================================================================
export const FREE_QUERY_GRUP = ["ROLE_QUERY_ADMIN", "ROLE_LEA_QUERY_ADMIN"];

export const canFreeQuery = (role) => {
  return true;
  //return FREE_QUERY_GRUP.includes(role);
};

//=================================================================
export const KONUM_SORGU_GRUP = [
  "ROLE_QUERY_ADMIN",
  "ROLE_LEA_QUERY_ADMIN",
  "ROLE_ADLI",
  "ROLE_ONLEYICI",
];

export const canKonumSorgu = (role) => {
  return KONUM_SORGU_GRUP.includes(role);
};

//=================================================================
export const canChangeOwnPassword = (role) => {
  return role !== "ROLE_ADLI";
};

export const isAdmin = (role) => {
  return role !== "ROLE_ADLI" && role != "ROLE_ONLEYICI";
};

//=================================================================
export default RoleTipi;
