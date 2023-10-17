export const getLatLngs = (
  centerInput,
  inRadius,
  outRadius,
  startBearing,
  endBearing,
  numberOfPoints,
) => {
  const center = { lat: centerInput[0], lng: centerInput[1] };
  const angle = endBearing - startBearing;
  const ptCount = (angle * numberOfPoints) / 360;
  const deltaAngle = angle / ptCount;
  const latlngs = [];

  //--------------  OUTER RADIUS ARC POINTS   --------------
  for (let i = 0; i < ptCount; i++) {
    const useAngle = startBearing + deltaAngle * i;
    latlngs.push(computeDestinationPoint(center, outRadius, useAngle));
  }

  latlngs.push(computeDestinationPoint(center, outRadius, endBearing));

  //--------------  INNER RADIUS ARC POINTS   --------------
  for (let i = 0; i < ptCount; i++) {
    const useAngle = endBearing - deltaAngle * i;
    latlngs.push(computeDestinationPoint(center, inRadius, useAngle));
  }

  latlngs.push(computeDestinationPoint(center, inRadius, startBearing));

  return latlngs;
};

export const computeDestinationPoint = (
  start = { lat: 0, lng: 0 },
  distance = 1,
  bearing = 0,
  radius = 6378137,
  rhumb = false,
) => {
  if (rhumb) {
    /*http://www.movable-type.co.uk/scripts/latlong.html*/

    const δ = Number(distance) / radius; // angular distance in radians
    const φ1 = (start.lat * Math.PI) / 180;
    const λ1 = (start.lng * Math.PI) / 180;
    const θ = (bearing * Math.PI) / 180;

    const Δφ = δ * Math.cos(θ);
    let φ2 = φ1 + Δφ;

    // check for some daft bugger going past the pole, normalise latitude if so
    if (Math.abs(φ2) > Math.PI / 2) φ2 = φ2 > 0 ? Math.PI - φ2 : -Math.PI - φ2;

    const Δψ = Math.log(
      Math.tan(φ2 / 2 + Math.PI / 4) / Math.tan(φ1 / 2 + Math.PI / 4),
    );
    const q = Math.abs(Δψ) > 10e-12 ? Δφ / Δψ : Math.cos(φ1); // E-W course becomes ill-conditioned with 0/0

    const Δλ = (δ * Math.sin(θ)) / q;
    const λ2 = λ1 + Δλ;

    let lngFinal = (((λ2 * 180) / Math.PI + 540) % 360) - 180;

    while (lngFinal > 360) lngFinal -= 360;
    //return new LatLon(φ2.toDegrees(), (λ2.toDegrees()+540) % 360 - 180); // normalise to −180..+180°
    return {
      lat: (φ2 * 180) / Math.PI,
      lng: lngFinal,
    };
  }
  const bng = (bearing * Math.PI) / 180;

  const lat1 = (start.lat * Math.PI) / 180;
  const lon1 = (start.lng * Math.PI) / 180;

  let lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(distance / radius) +
      Math.cos(lat1) * Math.sin(distance / radius) * Math.cos(bng),
  );

  let lon2 =
    lon1 +
    Math.atan2(
      Math.sin(bng) * Math.sin(distance / radius) * Math.cos(lat1),
      Math.cos(distance / radius) - Math.sin(lat1) * Math.sin(lat2),
    );

  lat2 = (lat2 * 180) / Math.PI;
  lon2 = (lon2 * 180) / Math.PI;

  return {
    lat: parseFloat(lat2.toFixed(6)),
    lng: parseFloat(lon2.toFixed(6)),
  };
};
