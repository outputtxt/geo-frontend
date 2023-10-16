import { useState, useEffect, useRef } from "react";
import HedefListesiTable from "../../../../components/HedefListesiTable";
import { getHedefListesi } from "../../../../service/rest/HedefListesiService";
import "../../../../components/HedefListesiTable.css";
import mockHedefListesiData from "../../../../service/rest/mocks/data/mockHedefListesiData.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const KonumSorguTipi = [
  {
    id: 0,
    name: "Son Konum",
  },
  {
    id: 1,
    name: "Geçmiş",
  },
  {
    id: 2,
    name: "Son Baz",
  },
  {
    id: 3,
    name: "Son 1-7 Gün",
  },
];

const KonumSorguPanel = () => {
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

  const onButtonClick = () => {
    console.log(dateRange);
    console.log(startDate);
    console.log(endDate);
  };

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
          onClick={() => onButtonClick()}
          style={{ float: "right", marginRight: "10px", marginTop: "10px" }}
        >
          Sorgula
        </button>
      </div>
    </div>
  );
};

export default KonumSorguPanel;
