import { useState, useEffect } from "react";
import HedefListesiTable from "../../../../components/HedefListesiTable";
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
  const [active, setActive] = useState(KonumSorguTipi[0].id);
  const [sonKacGun, setSonKacGun] = useState(1);

  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;

  const onButtonClick = () => {
    console.log(dateRange);
    console.log(startDate);
    console.log(endDate);
  };

  useEffect(() => {
    if (active == KonumSorguTipi[2].id) {
      alert("son baz");
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
              Geçmiş{" "}
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
              Son Gün{" "}
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

        <HedefListesiTable data={mockHedefListesiData} />

        <button
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
