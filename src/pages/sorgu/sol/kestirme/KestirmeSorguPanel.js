import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import { MapContext } from "../../../../util/Context";
import Constants from "../../../../util/Constants";
import { getLatLngs } from "../../../../util/SectorHelper";
import * as L from "leaflet";
// import("leaflet.sector/leaflet.sector.js");

const KestirmeSorguPanel = () => {
  const { map, layerKestirme } = useContext(MapContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  // const [bazX, setBazX] = useState(39.943);
  // const [bazY, setBazY] = useState(32.783);
  // const [inRadius, setInRadius] = useState(500);
  // const [outRadius, setOutRadius] = useState(1000);
  const [bazX, setBazX] = useState(null);
  const [bazY, setBazY] = useState(null);
  const [inRadius, setInRadius] = useState(null);
  const [outRadius, setOutRadius] = useState(null);
  const [startAngle, setStartAngle] = useState(null);
  const [stopAngle, setStopAngle] = useState(null);
  const [sorguyuSilme, setSorguyuSilme] = useState(false);

  const handleKestirmeSubmit = () => {
    if (!sorguyuSilme) {
      layerKestirme.clearLayers();
    }

    // console.log("sektor ciz");
    // let latlngs = getLatLngs(
    //   [bazX, bazY],
    //   parseFloat(inRadius),
    //   parseFloat(outRadius),
    //   parseFloat(startAngle),
    //   parseFloat(stopAngle),
    //   1000,
    // );
    // console.log(latlngs);
    // // var polygon = L.polygon(latlngs, {color: 'red'}).addTo(map);
    // L.polygon(latlngs, { color: "red" }).addTo(kestirmeFeatureGroupRef);

    L.sector({
      center: [bazX, bazY],
      innerRadius: parseFloat(inRadius),
      outerRadius: parseFloat(outRadius),
      startBearing: parseFloat(startAngle),
      endBearing: parseFloat(stopAngle),
      fill: true,
      fillColor: Constants.AREA_COLOR,
      fillOpacity: Constants.AREA_OPACITY,
      color: "black",
      weight: Constants.BORDER_WEIGHT,
    }).addTo(layerKestirme);

    map.fitBounds(layerKestirme.getBounds().pad(0.5));
  };

  const onSil = () => {
    layerKestirme.clearLayers();
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
            // value={bazX}
            value={undefined}
            type="text"
            id="bazX"
            {...register("bazX", {
              onChange: (event) => setBazX(event.target.value),
              required: true,
              pattern: Constants.LATITUDE_REGEX,
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
            // value={bazY}
            value={undefined}
            type="text"
            id="bazY"
            {...register("bazY", {
              onChange: (event) => setBazY(event.target.value),
              required: true,
              pattern: Constants.LONGITUDE_REGEX,
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
            // value={inRadius}
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
            // value={outRadius}
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
          <label className="sorgu-inline-label" htmlFor="stopAngle">
            Sorguyu Silme{" "}
          </label>

          <input
            type="checkbox"
            className="sorgu-right-button"
            id="sorguyuSilme"
            onClick={(event) => setSorguyuSilme(event.target.checked)}
          />
        </div>

        <div style={{ float: "right" }}>
          <input
            type="button"
            onClick={() => onSil()}
            value="Eski Sil"
            title="Haritadan Eski Çizimleri Temizle"
            className="sorgu-button"
            style={{ marginLeft: "auto", marginTop: "15px" }}
            id="haritaOldDrawingsClear"
          />

          <input
            type="button"
            onClick={() => reset()}
            value="Form Sil"
            className="sorgu-button"
            style={{ marginLeft: "10px" }}
            id="kestirmeFormClear"
          />

          <input
            type="submit"
            value="Çiz"
            className="sorgu-button"
            style={{ marginLeft: "10px" }}
            id="ciz"
          />
        </div>
      </form>
    </Box>
  );
};

export default KestirmeSorguPanel;
