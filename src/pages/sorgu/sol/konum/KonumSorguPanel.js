import { useState } from "react";
import Box from "@mui/material/Box";

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
  //   const [sonGun, setSonGun] =

  const onActiveChange = (event) => {
    // alert(event.target.value);
    // console.log(active + " : " + event.target.value);
    setActive(event.target.value);
    // console.log(active + " : " + event.target.value);
  };

  return (
    <div>
      {/* <div className="sorgu-fieldset"> */}
      <Box
        component="fieldset"
        className="sorgu-fieldset"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div onChange={(event) => onActiveChange(event)}>
          {KonumSorguTipi.map((item) => (
            <div>
              <label className="sorgu-label" htmlFor={item.id}>
                {item.name}
              </label>
              <input
                type="radio"
                value={item.id}
                key={item.id}
                id={item.id}
                name="konumSorguTipi"
              />
              {active == 1 ? (
                <select
                  value="Avea"
                  style={{
                    marginRight: "100px",
                    width: "150px",
                    float: "right",
                  }}
                  id="operatorSelect"
                  required
                >
                  <option value="Avea">Avea</option>
                  <option value="Turkcell">Turkcell</option>
                  <option value="Vodafone">Vodafone</option>
                </select>
              ) : (
                <br />
              )}
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default KonumSorguPanel;
