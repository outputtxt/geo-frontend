import { useContext } from "react";
import { MapContext, ContentContext } from "../util/Context";
import { format } from "date-fns";
import Constants from "../util/Constants";
import KonumSorguRestService from "./rest/KonumSorguRestService";
import TargetLastLocationResponse from "../model/backend/TargetLastLocationResponse";
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
  const sonKonumSorgula = async (target) => {
    const response = await KonumSorguRestService.sonKonumSorgula(target, mapFocus);

    if (response == null) {
      alert("Son Konum Sorgu uygulamaya bağlanamadı!");
      return;
    } else if (response.responseCode != "SUCCESS") {
      alert(response.responseMessage);
      return;
    }

    layerSorgu.clearLayers();

    response.locations.map((targetLocation) => {
      if(targetLocation.location.areaType === "Elliptical") {
        L.ellipse(
          [targetLocation.location.baseStationLatitude, targetLocation.location.baseStationLongitude],
          [targetLocation.location.outRadius, targetLocation.location.inRadius],
          targetLocation.location.startAngle,
          Constants.defaultPathOptions,
        ).addTo(layerSorgu);
      } else if (targetLocation.location.areaType === "CircularArc") {
        L.sector({
          center: [targetLocation.location.baseStationLatitude, targetLocation.location.baseStationLongitude],
          innerRadius: parseFloat(targetLocation.location.inRadius),
          outerRadius: parseFloat(targetLocation.location.outRadius),
          startBearing: parseFloat(targetLocation.location.startAngle),
          endBearing: parseFloat(targetLocation.location.stopAngle),
          fillColor: Constants.AREA_COLOR,
          fillOpacity: Constants.AREA_OPACITY,
          color: Constants.AREA_COLOR,
          weight: Constants.BORDER_WEIGHT,
        }).addTo(layerSorgu);

        // BAZ MARKER
        L.marker([targetLocation.location.baseStationLatitude, targetLocation.location.baseStationLongitude], {
          icon: Constants.BazIcon,
        }).addTo(layerSorgu);
      } else if (targetLocation.location.areaType === "Circular") {
        L.circle(
          [targetLocation.location.baseStationLatitude, targetLocation.location.baseStationLongitude],
          targetLocation.location.inRadius,
          Constants.defaultPathOptions,
        ).addTo(layerSorgu);
      }
    });

    try {
      map.fitBounds(layerSorgu.getBounds().pad(0.5));
    } catch (err) {
      console.log(err.message);
    }

    setContentHeader("Son Konum ("+ target.targetValue +") [Veriler "+ response.operator +" tarafından üretilen yaklaşık değerlerdir]");
    setContentData(response.getTable());
    setContentOpen(true);
  };

  //======================  Son Konum Gecmis Sorgu  ======================
  const sonKonumGecmisSorgula = async (target, dateRange) => {
    const response = await KonumSorguRestService.sonKonumGecmisSorgula(target, dateRange, mapFocus);


    if (response == null) {
      alert("Son Konum Sorgu Geçmişi uygulamaya bağlanamadı!");
      return;
    } else if (response.responseCode != "SUCCESS") {
      alert(response.responseMessage);
      return;
    }

    layerSorgu.clearLayers();

    response.locations.map((targetLocationHistory) => {
        // Target Location Marker
        L.marker([targetLocationHistory.location.baseStationLatitude, 
          targetLocationHistory.location.baseStationLongitude], {
          icon: Constants.MarkerIconBlue,
        }).addTo(layerSorgu);
    });

    try {
      map.fitBounds(layerSorgu.getBounds().pad(0.5));
    } catch (err) {
      console.log(err.message);
    }

    setContentHeader("Son Konum Sorgu Geçmişi ("+ target.targetValue +")");
    setContentData(response.getTable());
    setContentOpen(true);
  }
  

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
        "] Hedef [" + hedef.targetValue + "]",
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
    sonKonumGecmisSorgula,
    sonBazSorgula,
    // gecmisTarihSorgula,
    gecmisGunSorgula,
    konumSorguTemizle,
  };
};

export default useKonumSorguService;
