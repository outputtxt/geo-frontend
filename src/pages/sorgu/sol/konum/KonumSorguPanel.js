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
  const [active, setActive] = useState(KonumSorguTipi[0].name);

  

  return (
    <div>
      {/* <div className="sorgu-fieldset"> */}
      <Box
        component="fieldset"
        className="sorgu-fieldset"
        style={{ display: "flex", flexDirection: "column" }}
        onChange={(event) => setActive(event.target.value)}
      >
        {KonumSorguTipi.map((item) => (
          <div>
            <label className="sorgu-label" htmlFor="sonKonum">
              {item.name}
            </label>
            <input type="radio" value={item.id} name="konumSorguTipi" />
          </div>
        ))}
      </Box>
    </div>
  );
};

export default KonumSorguPanel;
