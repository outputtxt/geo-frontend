import { useState, useEffect, useRef, useContext } from "react";
import { MapContext } from "../../../../util/context/Context";
import * as L from "leaflet";
// import "leaflet-ellipse";
import "./l.ellipse";
import { LeafletConstants } from "../../../../util/Constants";
import HedefListesiTable from "../../../../components/HedefListesiTable";
import { getHedefListesi } from "../../../../service/rest/HedefListesiService";
import KonumSorguService from "../../../../service/rest/KonumSorguService";
import SonKonumEllipseResponse from "../../../../model/response/SonKonumEllipseResponse";
import SonKonumSectorResponse from "../../../../model/response/SonKonumSectorResponse";
import SonKonumCircularResponse from "../../../../model/response/SonKonumCircularResponse";
import SonBazResponse from "../../../../model/response/SonBazResponse";
import KonumSorguTipi from "../../../../model/enum/KonumSorguTipi";
import "../../../../components/HedefListesiTable.css";
import mockHedefListesiData from "../../../../service/rest/mocks/data/mockHedefListesiData.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const KonumSorguPanel = ({
  setContentData,
  setContentHeader,
  setContentOpen,
}) => {
  // MAP from Context
  const { map, featureGroupRef } = useContext(MapContext);

  const [hedef, setHedef] = useState(null);
  const [hedefListesi, setHedefListesi] = useState(null);
  const [hedefListesiMSISDN, setHedefListesiMSISDN] = useState(null);
  const [hedefListesiIMEI, setHedefListesiIMEI] = useState(null);
  const [hedefListesiIMSI, setHedefListesiIMSI] = useState(null);

  const [active, setActive] = useState(KonumSorguTipi[0].id);
  const [sonKacGun, setSonKacGun] = useState(1);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;

  const refMSISDN = useRef();
  const refIMEI = useRef();
  const refIMSI = useRef();

  const onSorgulaClick = () => {
    switch (active) {
      case KonumSorguTipi[0].id:
        sonKonumSorgula();
      case KonumSorguTipi[1].id:
        gecmisSorgula();
      case KonumSorguTipi[2].id:
        sonBazSorgula();
      case KonumSorguTipi[3].id:
        sonGunSorgula();
    }
  };

  const sonKonumSorgula = () => {
    const response = KonumSorguService.sonKonumSorgula(hedef);
    console.log(response);

    featureGroupRef.clearLayers();

    if (response instanceof SonKonumEllipseResponse) {
      var elips = L.ellipse(
        [response.ellipse.X, response.ellipse.Y],
        [response.ellipse.maxRadius, response.ellipse.minRadius],
        response.ellipse.angle,
        {
          color: LeafletConstants.AREA_COLOR,
          fillColor: LeafletConstants.AREA_COLOR,
          fillOpacity: LeafletConstants.AREA_OPACITY,
        },
      ).addTo(featureGroupRef);

      // map.fitBounds(featureGroupRef.getBounds().pad(0.5));
    } else if (response instanceof SonKonumSectorResponse) {
      L.sector({
        center: [response.sector.bazX, response.sector.bazY],
        innerRadius: parseFloat(response.sector.inRadius),
        outerRadius: parseFloat(response.sector.outRadius),
        startBearing: parseFloat(response.sector.startAngle),
        endBearing: parseFloat(response.sector.stopAngle),
        fillColor: LeafletConstants.AREA_COLOR,
        fillOpacity: LeafletConstants.AREA_OPACITY,
        color: LeafletConstants.AREA_COLOR,
        // rhumb: true,
        // numberOfPoints: 50000,
        // fill: true,
        // opacity: 1.0,
      }).addTo(featureGroupRef);

      // BAZ MARKER
      L.marker([response.sector.bazX, response.sector.bazY], {
        icon: LeafletConstants.BazIcon,
      }).addTo(featureGroupRef);

      // map.fitBounds(featureGroupRef.getBounds().pad(0.5));
    } else if (response instanceof SonKonumCircularResponse) {
      L.circle([response.circle.X, response.circle.Y], response.circle.radius, {
        fillColor: LeafletConstants.AREA_COLOR,
        fillOpacity: LeafletConstants.AREA_OPACITY,
        color: LeafletConstants.AREA_COLOR,
      }).addTo(featureGroupRef);
    }

    map.fitBounds(featureGroupRef.getBounds().pad(0.5));
  };

  const gecmisSorgula = () => {};

  const sonBazSorgula = () => {
    const response = KonumSorguService.sonBazSorgula(hedef);
    console.log(response);
    featureGroupRef.clearLayers();

    if (response instanceof SonBazResponse) {
      L.sector({
        center: [response.bazX, response.bazY],
        innerRadius: parseFloat(0),
        outerRadius: parseFloat(LeafletConstants.BAZ_RADIUS),
        startBearing: parseFloat(
          response.angle - LeafletConstants.BAZ_ANGLE_RANGE,
        ),
        endBearing: parseFloat(
          response.angle + LeafletConstants.BAZ_ANGLE_RANGE,
        ),
        fillColor: LeafletConstants.AREA_COLOR,
        fillOpacity: LeafletConstants.AREA_OPACITY,
        color: LeafletConstants.AREA_COLOR,
      }).addTo(featureGroupRef);

      // BAZ MARKER
      L.marker([response.bazX, response.bazY], {
        icon: LeafletConstants.BazIcon,
      }).addTo(featureGroupRef);

      map.fitBounds(featureGroupRef.getBounds().pad(0.5));
    }
  };

  const sonGunSorgula = () => {};

  // clear previous selected hedef from different type lists
  useEffect(() => {
    if (hedef && hedef.targetType !== "MSISDN") {
      refMSISDN.current.unSelect();
    }
    if (hedef && hedef.targetType !== "IMEI") {
      refIMEI.current.unSelect();
    }
    if (hedef && hedef.targetType !== "IMSI") {
      refIMSI.current.unSelect();
    }
  }, [hedef]);

  // LOAD DATA
  useEffect(() => {
    //setHedefListesi(getHedefListesi(setHedefListesi));
    setHedefListesi(mockHedefListesiData);
  }, []);

  useEffect(() => {
    // mockHedefListesiData

    if (hedefListesi) {
      setHedefListesiMSISDN(
        Array.from(hedefListesi)
          .filter((hedef) => hedef.targetType === "MSISDN")
          .sort((h1, h2) => h1.targetValue.localeCompare(h2.targetValue)),
      );
      setHedefListesiIMEI(
        Array.from(hedefListesi)
          .filter((hedef) => hedef.targetType === "IMEI")
          .sort((h1, h2) => h1.targetValue.localeCompare(h2.targetValue)),
      );
      setHedefListesiIMSI(
        Array.from(hedefListesi)
          .filter((hedef) => hedef.targetType === "IMSI")
          .sort((h1, h2) => h1.targetValue.localeCompare(h2.targetValue)),
      );
    }
  }, [hedefListesi]);

  useEffect(() => {
    if (active == KonumSorguTipi[2].id) {
      // alert("son baz");
    }
  }, [active]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="sorgu-sol-tab-group">
        {KonumSorguTipi.map((item) => (
          <button
            className={
              active === item.id
                ? "sorgu-sol-tab sorgu-sol-tab-active"
                : "sorgu-sol-tab"
            }
            key={item.id}
            onClick={() => setActive(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="sorgu-sol-content">
        {active == 1 && (
          <div className="sorgu-fieldset-no-border">
            <label className="sorgu-label" htmlFor="gecmis">
              Geçmiş
            </label>

            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              isClearable={true}
              dateFormat="dd/MM/yyyy"
              withPortal
            />
          </div>
        )}

        {active == 3 && (
          <div className="sorgu-fieldset-no-border">
            <label className="sorgu-label" htmlFor="sonGun">
              Son Gün
            </label>
            <input
              className="sorgu-form-data-normal"
              style={{ width: "175px" }}
              value={sonKacGun}
              type="number"
              min="1"
              id="sonGun"
              onChange={(event) => setSonKacGun(event.target.value)}
            />
          </div>
        )}

        <div
          className="target-table"
          style={{
            display:
              hedefListesi != null && hedefListesi.length > 0 ? "" : "none",
          }}
        >
          <HedefListesiTable
            data={hedefListesiMSISDN}
            header="MSISDN"
            setHedef={setHedef}
            ref={refMSISDN}
          />
          <HedefListesiTable
            data={hedefListesiIMEI}
            header="IMEI"
            setHedef={setHedef}
            ref={refIMEI}
          />
          <HedefListesiTable
            data={hedefListesiIMSI}
            header="IMSI"
            setHedef={setHedef}
            ref={refIMSI}
          />
        </div>
        <button
          disabled={!hedef}
          onClick={() => onSorgulaClick()}
          style={{ float: "right", marginRight: "10px", marginTop: "10px" }}
        >
          Sorgula
        </button>
      </div>
    </div>
  );
};

export default KonumSorguPanel;
