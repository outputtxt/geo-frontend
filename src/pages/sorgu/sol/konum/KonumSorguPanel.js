import { useState } from "react";

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

            {/* <input
              style={{ width: "60px" }}
              // className="sorgu-form-data-normal"
              value={undefined}
              type="text"
              id="gecmis"
              // {...register("gecmis", {
              // onChange: event => setX(event.target.value),
              // required: true,
              // pattern: LATITUDE_REGEX
              // })}
            /> */}
            {/* errors.email.type === "required"    -    errors.email.type === "pattern" */}
            {/* {errors.enlemX && <p className="sorgu-form-hata-label">Hatalı Enlem!</p> } */}
          </div>
        )}

        {active == 3 && (
          <div className="sorgu-fieldset-no-border">
            <label className="sorgu-label" htmlFor="sonGun">
              Son Gün{" "}
            </label>
            <input
              className="sorgu-form-data-normal"
              value={sonKacGun}
              type="number"
              min="1"
              id="sonGun"
              onChange={(event) => setSonKacGun(event.target.value)}
            />
          </div>
        )}

        <br />
        <p>Konum Sorgu Panel - {sonKacGun}</p>
      </div>
    </div>
  );
};

export default KonumSorguPanel;
