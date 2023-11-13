import { useContext } from "react";
import { MapContext, ContentContext } from "../util/Context";
import { format } from "date-fns";
import Constants from "../util/Constants";
import KonumSorguRestService from "./rest/KonumSorguRestService";
import SonKonumEllipseResponse from "../model/response/konum/SonKonumEllipseResponse";
import SonKonumSectorResponse from "../model/response/konum/SonKonumSectorResponse";
import SonKonumCircularResponse from "../model/response/konum/SonKonumCircularResponse";
import SonBazResponse from "../model/response/konum/SonBazResponse";
import GecmisKonumSorguResponse from "../model/response/konum/gecmis/GecmisKonumSorguResponse";
import * as L from "leaflet";

export const useKonumSorguService = () => {
  const { map, layerSorgu } = useContext(MapContext);
  const { setContentHeader, setContentOpen, setContentData } =
    useContext(ContentContext);
  var gecmisSorguMarkersMap = new Map();
  var selectedCellId = null;

  //======================   Konum Sorgu Functions  ======================
  const mapFocus = (X, Y) => {
    try {
      map.setView([X, Y], Constants.MAX_ZOOM - 3);
    } catch (err) {
      console.log(err.message);
    }
  };

  const selectMarker = (cellId) => {
    if (selectedCellId === cellId) {
      var marker = gecmisSorguMarkersMap.get(selectedCellId);
      marker.setIcon(Constants.MarkerIconBlue);
      selectedCellId = null;
    } else {
      if (selectedCellId != null) {
        var marker = gecmisSorguMarkersMap.get(selectedCellId);
        marker.setIcon(Constants.MarkerIconBlue);
      }

      marker = gecmisSorguMarkersMap.get(cellId);
      marker.setIcon(Constants.MarkerIconGreen);
      selectedCellId = cellId;
    }

    var elements = document.querySelectorAll('[id^="htsCellIdSelector"]');

    Array.from(elements).map((item) => {
      if (item.innerHTML === selectedCellId) {
        item.classList.add("contenttable-selected-td");
      } else {
        item.classList.remove("contenttable-selected-td");
      }
    });
  };

  const konumSorguTemizle = () => {
    if (layerSorgu != null) {
      layerSorgu.clearLayers();
    }
    setContentOpen(false);
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

    setContentHeader("Son Konum");
    setContentData(response.getTable());
    setContentOpen(true);
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

      setContentHeader(
        "En Son Sinyal Alınan Baz İstasyonu (" + hedef.targetValue + ")",
      );
      setContentData(response.getTable());
      setContentOpen(true);
    }
  };

  //======================  Gecmis Sorgu  ======================
  const gecmisTarihSorgula = (hedef, dateRange) => {
    const response = KonumSorguRestService.gecmisTarihSorgula(
      hedef,
      dateRange,
      mapFocus,
      selectMarker,
    );

    if (!(response instanceof GecmisKonumSorguResponse)) {
      alert("wrong response!");
      return;
    }

    Array.from(response.baseStationMap.values()).map((base) => {
      var marker = L.marker([base.bazX, base.bazY], {
        icon: Constants.MarkerIconBlue,
      })
        .addTo(layerSorgu)
        .on("click", function (e) {
          selectMarker(base.cellId);
        });

      gecmisSorguMarkersMap.set(base.cellId, marker);
    });

    try {
      map.fitBounds(layerSorgu.getBounds().pad(0.5));
    } catch (err) {
      console.log(err.message);
    }

    setContentHeader(
      "Geçmiş Kayıtlar [" +
        format(new Date(dateRange[1]), "yyyy/MM/dd") +
        "- " +
        format(new Date(dateRange[0]), "yyyy/MM/dd") +
        "] Hedef [" +
        hedef.targetValue +
        "]",
    );
    setContentData(response.getTable());
    setContentOpen(true);
  };

  //======================  Son Gun Sorgu  ======================
  const gecmisGunSorgula = (hedef, sonKacGun) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (sonKacGun - 1));

    gecmisTarihSorgula(hedef, [startDate, endDate]);
  };

  return {
    sonKonumSorgula,
    sonBazSorgula,
    gecmisTarihSorgula,
    gecmisGunSorgula,
    konumSorguTemizle,
  };
};

export default useKonumSorguService;
