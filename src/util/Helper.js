export const round = (number, precision = 0) => {
  return (
    Math.round(number * Math.pow(10, precision) + Number.EPSILON) /
    Math.pow(10, precision)
  );
};

export const formatLatitude = (latitude) => {
  const direction = latitude > 0 ? "K" : "G";
  return `${round(Math.abs(latitude), 6)}° ${direction}`;
};

export const formatLongitude = (longitude) => {
  const direction = longitude > 0 ? "D" : "B";
  return `${round(Math.abs(longitude), 6)}° ${direction}`;
};
