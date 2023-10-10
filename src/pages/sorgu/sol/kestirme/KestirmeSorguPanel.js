import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import { MapContext } from "../../../../util/context/Context";
import { LATITUDE_REGEX, LONGITUDE_REGEX } from "../../../../util/Constants";
import * as L from "leaflet";

const KestirmeSorguPanel = () => {
  // MAP feature group from Context
  const { map, kestirmeFeatureGroupRef } = useContext(MapContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [bazX, setBazX] = useState(null);
  const [bazY, setBazY] = useState(null);
  const [inRadius, setInRadius] = useState(null);
  const [outRadius, setOutRadius] = useState(null);
  const [startAngle, setStartAngle] = useState(null);
  const [stopAngle, setStopAngle] = useState(null);
  const [sorguyuSilme, setSorguyuSilme] = useState(false);

  const handleKestirmeSubmit = () => {
    if (!sorguyuSilme) {
      kestirmeFeatureGroupRef.clearLayers();
    }

    L.sector({
      center: [bazX, bazY],
      innerRadius: inRadius,
      outerRadius: outRadius,
      startBearing: startAngle,
      endBearing: stopAngle,
      color: "orange",
    }).addTo(kestirmeFeatureGroupRef);

    map.fitBounds(kestirmeFeatureGroupRef.getBounds().pad(0.5));
    //map.setView([bazX, bazY], MAX_ZOOM - 2);
  };

  const onSil = () => {
    kestirmeFeatureGroupRef.clearLayers();
  };

  return (
    <Box component="fieldset" className="sorgu-fieldset">
      <legend className="sorgu-fieldset-legend">TA Parametreleri</legend>

      <form
        onSubmit={handleSubmit(handleKestirmeSubmit)}
        style={{ lineHeight: "30px" }}
      >
        <div>
          <label className="sorgu-label" htmlFor="bazX">
            BazX{" "}
          </label>
          <input
            className={
              errors.bazX ? "sorgu-form-data-error" : "sorgu-form-data-normal"
            }
            value={undefined}
            type="text"
            id="bazX"
            {...register("bazX", {
              onChange: (event) => setBazX(event.target.value),
              required: true,
              pattern: LATITUDE_REGEX,
            })}
          />
          {errors.bazX && <p className="sorgu-form-hata-label">Hatalı BazX!</p>}
        </div>
        <div>
          <label className="sorgu-label" htmlFor="bazY">
            BazY{" "}
          </label>
          <input
            className={
              errors.bazY ? "sorgu-form-data-error" : "sorgu-form-data-normal"
            }
            value={undefined}
            type="text"
            id="bazY"
            {...register("bazY", {
              onChange: (event) => setBazY(event.target.value),
              required: true,
              pattern: LONGITUDE_REGEX,
            })}
          />
          {errors.bazY && <p className="sorgu-form-hata-label">Hatalı BazY!</p>}
        </div>

        <div>
          <label className="sorgu-label" htmlFor="inRadius">
            InRadius{" "}
          </label>
          <input
            className={
              errors.inRadius
                ? "sorgu-form-data-error"
                : "sorgu-form-data-normal"
            }
            value={undefined}
            type="text"
            id="inRadius"
            {...register("inRadius", {
              onChange: (event) => setInRadius(event.target.value),
            })}
          />
        </div>
        <div>
          <label className="sorgu-label" htmlFor="outRadius">
            OutRadius{" "}
          </label>
          <input
            className={
              errors.outRadius
                ? "sorgu-form-data-error"
                : "sorgu-form-data-normal"
            }
            value={undefined}
            type="text"
            id="outRadius"
            {...register("outRadius", {
              onChange: (event) => setOutRadius(event.target.value),
            })}
          />
        </div>
        <div>
          <label className="sorgu-label" htmlFor="startAngle">
            Start Angle{" "}
          </label>
          <input
            className={
              errors.startAngle
                ? "sorgu-form-data-error"
                : "sorgu-form-data-normal"
            }
            value={undefined}
            type="text"
            id="startAngle"
            {...register("startAngle", {
              onChange: (event) => setStartAngle(event.target.value),
            })}
          />
        </div>
        <div>
          <label className="sorgu-label" htmlFor="stopAngle">
            Stop Angle{" "}
          </label>
          <input
            className={
              errors.stopAngle
                ? "sorgu-form-data-error"
                : "sorgu-form-data-normal"
            }
            value={undefined}
            type="text"
            id="stopAngle"
            {...register("stopAngle", {
              onChange: (event) => setStopAngle(event.target.value),
            })}
          />
        </div>

        <div>
          <input
            type="checkbox"
            className="sorgu-right-button"
            id="sorguyuSilme"
            onClick={(event) => setSorguyuSilme(event.target.checked)}
          />
          <label className="sorgu-inline-label" htmlFor="stopAngle">
            Sorguyu Silme{" "}
          </label>
          <br />
        </div>

        <input
          type="submit"
          value="Çiz"
          className="sorgu-right-button"
          id="ciz"
        />
        <input
          type="button"
          onClick={() => onSil()}
          value="Harita Temizle"
          className="sorgu-right-button"
          id="clear"
        />
        <input
          type="button"
          onClick={() => reset()}
          value="Form Temizle"
          style={{ float: "right", marginTop: "10px" }}
          id="clear"
        />
      </form>
    </Box>
  );
};

export default KestirmeSorguPanel;
