import { useContext } from "react";
import { MapContext, ContentContext } from "../util/Context";
import Constants from "../util/Constants";
import KonumSorguRestService from "./rest/KonumSorguRestService";
import SonKonumEllipseResponse from "../model/response/konum/SonKonumEllipseResponse";
import SonKonumSectorResponse from "../model/response/konum/SonKonumSectorResponse";
import SonKonumCircularResponse from "../model/response/konum/SonKonumCircularResponse";
import SonBazResponse from "../model/response/konum/SonBazResponse";
import * as L from "leaflet";

export const useKonumSorguService = () => {
  const { map, layerSorgu } = useContext(MapContext);
  const { setContentHeader, setContentOpen, setContentData } =
    useContext(ContentContext);

  //======================   MAP FOCUS function for Content Data  ======================
  const mapFocus = (X, Y) => {
    try {
      map.setView([X, Y], Constants.MAX_ZOOM - 3);
    } catch (err) {
      console.log(err.message);
    }
  };

  //======================  Son Konum Sorgu  ======================
  const sonKonumSorgula = (hedef) => {
    const response = KonumSorguRestService.sonKonumSorgula(hedef, mapFocus);
    console.log(response);

    if (response == null) {
      alert("position method failure!");
      return;
    }

    layerSorgu.clearLayers();

    if (response instanceof SonKonumEllipseResponse) {
      var elips = L.ellipse(
        [response.ellipse.X, response.ellipse.Y],
        [response.ellipse.maxRadius, response.ellipse.minRadius],
        response.ellipse.angle,
        Constants.defaultPathOptions,
      ).addTo(layerSorgu);

      // map.fitBounds(layerSorgu.getBounds().pad(0.5));
    } else if (response instanceof SonKonumSectorResponse) {
      L.sector({
        center: [response.sector.bazX, response.sector.bazY],
        innerRadius: parseFloat(response.sector.inRadius),
        outerRadius: parseFloat(response.sector.outRadius),
        startBearing: parseFloat(response.sector.startAngle),
        endBearing: parseFloat(response.sector.stopAngle),
        fillColor: Constants.AREA_COLOR,
        fillOpacity: Constants.AREA_OPACITY,
        color: Constants.AREA_COLOR,
        weight: Constants.BORDER_WEIGHT,
      }).addTo(layerSorgu);

      // BAZ MARKER
      L.marker([response.sector.bazX, response.sector.bazY], {
        icon: Constants.BazIcon,
      }).addTo(layerSorgu);

      // mapState..fitBounds(layerSorgu.getBounds().pad(0.5));
    } else if (response instanceof SonKonumCircularResponse) {
      L.circle(
        [response.circle.X, response.circle.Y],
        response.circle.radius,
        Constants.defaultPathOptions,
      ).addTo(layerSorgu);
    }

    try {
      map.fitBounds(layerSorgu.getBounds().pad(0.5));
    } catch (err) {
      console.log(err.message);
    }

    var contentData = response.getTable();

    setContentHeader("Son Konum");
    setContentData(contentData);
    setContentOpen(true);
  };

  //======================  Gecmis Sorgu  ======================
  const gecmisSorgula = (hedef, dateRange) => {
    const [startDate, endDate] = dateRange;
  };

  //======================  Son Baz Sorgu  ======================
  const sonBazSorgula = (hedef) => {
    const response = KonumSorguRestService.sonBazSorgula(hedef, mapFocus);
    console.log(response);
    layerSorgu.clearLayers();

    if (response instanceof SonBazResponse) {
      if (response.angle == 0) {
        L.circle(
          [response.bazX, response.bazY],
          Constants.BAZ_RADIUS,
          Constants.defaultPathOptions,
        ).addTo(layerSorgu);
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
        }).addTo(layerSorgu);
      }

      // BAZ MARKER
      L.marker([response.bazX, response.bazY], {
        icon: Constants.BazIcon,
      }).addTo(layerSorgu);

      try {
        map.fitBounds(layerSorgu.getBounds().pad(0.5));
      } catch (err) {
        console.log(err.message);
      }

      var contentData = response.getTable();

      setContentHeader(
        "En Son Sinyal Alınan Baz İstasyonu (" + hedef.targetValue + ")",
      );
      setContentData(contentData);
      setContentOpen(true);
    }
  };

  //======================  Son Gun Sorgu  ======================
  const sonGunSorgula = (hedef, sonKacGun) => {};

  return { sonKonumSorgula, gecmisSorgula, sonBazSorgula, sonGunSorgula };
};

export default useKonumSorguService;
