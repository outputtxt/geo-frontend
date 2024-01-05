import { useState, useEffect, useRef } from "react";
import HedefListesiTable from "../../../../components/HedefListesiTable";
import { getHedefListesi } from "../../../../service/rest/HedefListesiRestService";
import { authInfoStore } from "../../../../util/CoreStore";
import { useSnapshot } from "valtio";
import useKonumSorguService from "../../../../service/KonumSorguService";
import KonumSorguTipi from "../../../../model/enum/KonumSorguTipi";
import TargetType from "../../../../model/enum/TargetType";
import mockHedefListesiData from "../../../../service/rest/mocks/data/mockHedefListesiData.json";
import DatePicker from "react-datepicker";
import Box from "@mui/material/Box";
import { canFreeQuery } from "../../../../model/enum/RoleTipi";
import "../../../../components/HedefListesiTable.css";
import "react-datepicker/dist/react-datepicker.css";

const KonumSorguPanel = () => {
  const konumSorguService = useKonumSorguService();
  const { role } = useSnapshot(authInfoStore);

  const [hedef, setHedef] = useState(null);
  const [hedefListesi, setHedefListesi] = useState(null);
  const [hedefListesiMSISDN, setHedefListesiMSISDN] = useState(null);
  const [hedefListesiIMEI, setHedefListesiIMEI] = useState(null);
  const [hedefListesiIMSI, setHedefListesiIMSI] = useState(null);

  const [hedefTipi, setHedefTipi] = useState("");
  const [hedefDeger, setHedefDeger] = useState(null);

  const [active, setActive] = useState(KonumSorguTipi[0].id);
  const [sonKacGun, setSonKacGun] = useState(1);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;

  const refMSISDN = useRef();
  const refIMEI = useRef();
  const refIMSI = useRef();

  const onHedefTipiChange = (event) => {
    event.preventDefault();
    setHedefTipi(event.target.value);
  };

  const onHedefDegerChange = (event) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
    setHedefDeger(event.target.value);
    event.preventDefault();
  };

  //============================  KONUM SORGULA  ============================
  const onSorgulaClick = () => {
    console.log(hedefTipi);
    console.log(hedefDeger);

    switch (active) {
      case KonumSorguTipi[0].id:
        return konumSorguService.sonKonumSorgula(hedef);
      case KonumSorguTipi[1].id:
        return konumSorguService.sonKonumGecmisSorgula(hedef, dateRange);
      case KonumSorguTipi[2].id:
        return konumSorguService.sonBazSorgula(hedef);
      case KonumSorguTipi[3].id:
        return konumSorguService.sonBazXGunSorgula(hedef, sonKacGun);
    }
  };

  //=======  clear previous selected hedef from different type lists  =======
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
    konumSorguService.konumSorguTemizle();
  }, [active]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="sorgu-sol-tab-group">
        {KonumSorguTipi.filter((item) => item.hidden === false).map((item) => (
          <button
            className={
              active === item.id
                ? "sorgu-sol-tab sorgu-sol-tab-active"
                : "sorgu-sol-tab"
            }
            key={item.id}
            onClick={() => setActive(item.id)}
            style={{ fontSize: "13px", fontWeight: "bold" }}
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

        {canFreeQuery(role) ? (
          <Box component="fieldset" className="sorgu-fieldset">
            <legend className="sorgu-fieldset-legend">Hedef</legend>

            <form onSubmit={onSorgulaClick} style={{ lineHeight: "30px" }}>
              <label
                className="sorgu-label"
                htmlFor="hedefTipiSelect"
                style={{ width: "100px" }}
              >
                Hedef Tipi
              </label>
              <select
                value={hedefTipi}
                onChange={onHedefTipiChange}
                style={{ width: "172px" }}
                id="hedefTipiSelect"
                required
              >
                <option
                  disabled
                  defaultValue
                  style={{ display: hedefTipi != null ? "none" : "" }}
                >
                  {" "}
                </option>

                {TargetType.map((item) => {
                  return (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
              <br />

              <label
                className="sorgu-label"
                htmlFor="hedefDegerId"
                style={{ width: "100px" }}
              >
                Hedef
              </label>
              <input
                className="reset"
                style={{ width: "165px" }}
                onChange={onHedefDegerChange}
                id="hedefDegerId"
                required
              />
              <br />

              <input
                type="submit"
                value="Sorgula"
                style={{
                  float: "right",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
                className="sorgu-button"
                id="submit"
              />
            </form>
          </Box>
        ) : (
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

            <button
              className="sorgu-button"
              disabled={!hedef}
              onClick={onSorgulaClick}
              style={{ float: "right", marginRight: "10px", marginTop: "10px" }}
            >
              Sorgula
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default KonumSorguPanel;
