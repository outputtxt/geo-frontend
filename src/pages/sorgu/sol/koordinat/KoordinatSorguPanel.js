import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import * as L from "leaflet";
import { MapContext } from "../../../../util/context/Context";
import Constants from "../../../../util/Constants";

const KoordinatSorguPanel = () => {
  // MAP from Context
  const { map, featureGroupRef } = useContext(MapContext);

  // This State
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);

  //*************  Koordinat Sorgu  *************/
  const handleKoordinatSubmit = () => {
    L.marker([x, y]).addTo(featureGroupRef);
    //map.setView([x, y], map.getZoom());
    map.setView([x, y], Constants.MAX_ZOOM - 2);
    // map.flyTo([x, y], MAX_ZOOM);
  };

  return (
    <Box component="fieldset" className="sorgu-fieldset">
      <legend className="sorgu-fieldset-legend">Koordinatlar</legend>

      <form
        onSubmit={handleSubmit(handleKoordinatSubmit)}
        style={{ lineHeight: "30px" }}
      >
        <div>
          <label className="sorgu-label" htmlFor="enlemX">
            Enlem &nbsp;(X){" "}
          </label>
          <input
            className={
              errors.enlemX ? "sorgu-form-data-error" : "sorgu-form-data-normal"
            }
            value={undefined}
            type="text"
            id="enlemX"
            {...register("enlemX", {
              onChange: (event) => setX(event.target.value),
              required: true,
              pattern: Constants.LATITUDE_REGEX,
            })}
          />
          {/* errors.email.type === "required"    -    errors.email.type === "pattern" */}
          {errors.enlemX && (
            <p className="sorgu-form-hata-label">Hatalı Enlem!</p>
          )}
        </div>
        <div>
          <label className="sorgu-label" htmlFor="boylamY">
            Boylam (Y){" "}
          </label>
          <input
            className={
              errors.boylamY
                ? "sorgu-form-data-error"
                : "sorgu-form-data-normal"
            }
            value={undefined}
            type="text"
            id="boylamY"
            {...register("boylamY", {
              onChange: (event) => setY(event.target.value),
              required: true,
              pattern: Constants.LONGITUDE_REGEX,
            })}
          />
          {/* errors.email.type === "required"    -    errors.email.type === "pattern" */}
          {errors.boylamY && (
            <p className="sorgu-form-hata-label">Hatalı Boylam!</p>
          )}
        </div>

        <input
          type="submit"
          value="Göster"
          style={{ float: "right", marginTop: "10px", marginLeft: "10px" }}
          id="goster"
        />
        <input
          type="button"
          onClick={() => reset()}
          value="Temizle"
          style={{ float: "right", marginTop: "10px" }}
          id="clear"
        />
      </form>
    </Box>
  );
};

export default KoordinatSorguPanel;
