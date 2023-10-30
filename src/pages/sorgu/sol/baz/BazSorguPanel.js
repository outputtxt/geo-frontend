import { useState, Fragment } from "react";
import { useSnapshot } from "valtio";
import { MapProxy } from "../../../../util/context/Context";
import * as L from "leaflet";
import { LeafletConstants } from "../../../../util/Constants";
import BazSorguService from "../../../../service/rest/BazSorguService";
import useMapService from "../../../../service/MapService";
import OperatorTipi from "../../../../model/enum/OperatorTipi";
import Box from "@mui/material/Box";

const BazSorguPanel = () => {
  const mapState = useSnapshot(MapProxy);
  const { drawBaz } = useMapService();

  const [operator, setOperator] = useState("");
  const [cellId, setCellId] = useState(null);
  // const [aveaCheckBox, setAveaCheckBox] = useState(false);
  // const [turkcellCheckBox, setTurkcellCheckBox] = useState(false);
  // const [vodafoneCheckBox, setVodafoneCheckBox] = useState(false);

  // =======================  CELL BUL FUNCTIONS  =======================
  const handleCellBulSubmit = (event) => {
    event.preventDefault();
    mapState.layers.sorgu.current.clearLayers();

    const response = BazSorguService.cellSorgula(operator, cellId);
    console.log(response);

    if (response.angle == 0) {
      L.circle([response.bazX, response.bazY], LeafletConstants.BAZ_RADIUS, {
        fillColor: LeafletConstants.AREA_COLOR,
        fillOpacity: LeafletConstants.AREA_OPACITY,
        color: LeafletConstants.AREA_COLOR,
      }).addTo(mapState.layers.sorgu.current);
    } else {
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
      }).addTo(mapState.layers.sorgu.current);
    }

    // BAZ MARKER
    L.marker([response.bazX, response.bazY], {
      icon: LeafletConstants.BazIcon,
    }).addTo(mapState.layers.sorgu.current);

    mapState.map.current.fitBounds(mapState.layers.sorgu.current.getBounds().pad(0.5));
  };

  const onOperatorChange = (event) => {
    event.preventDefault();
    setOperator(event.target.value);
  };

  const onCellIdChange = (event) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
    setCellId(event.target.value);
    event.preventDefault();
  };

  // =======================  BAZ ISTASYONLARI FUNCTIONS  =======================
  const onBazListeOperatorChange = (event, bazListeOperator) => {
    var bazListeLayer;
    switch (bazListeOperator) {
      case OperatorTipi[0]:
        bazListeLayer = mapState.layers.aveaBazList;
        break;
      case OperatorTipi[1]:
        bazListeLayer = mapState.layers.turkcellBazList;
        break;
      case OperatorTipi[2]:
        bazListeLayer = mapState.layers.vodafoneBazList;
        break;
    }

    bazListeLayer = bazListeLayer.current;
  
    if (event.target.checked) {
      var bazColor =
        LeafletConstants.OPERATOR_BAZ_COLOR_MAP.get(bazListeOperator);
      var cellLocationListe = BazSorguService.bazListeSorgula(bazListeOperator);

      cellLocationListe.map((cellLocation) => {
        drawBaz(
          bazListeLayer,
          cellLocation.X,
          cellLocation.Y,
          cellLocation.angle,
          cellLocation.adres,
          bazColor
        );

        // BAZ CENTER POINT
        L.circle([cellLocation.X, cellLocation.Y], 2, {
          fillColor: bazColor,
          fillOpacity: 1,
          color: bazColor,
        }).addTo(bazListeLayer);
      });

      mapState.map.current.fitBounds(bazListeLayer.getBounds());
    } else {
      bazListeLayer.clearLayers();
    }
  };

  return (
    <div>
      <Box component="fieldset" className="sorgu-fieldset">
        <legend className="sorgu-fieldset-legend">Cell Bul</legend>
        <form
          onSubmit={(event) => handleCellBulSubmit(event)}
          style={{ lineHeight: "30px" }}
        >
          <label className="sorgu-label" htmlFor="operatorSelect">
            Operatör
          </label>
          <select
            value={operator}
            onChange={onOperatorChange}
            style={{ width: "150px" }}
            id="operatorSelect"
            required
          >
            <option
              disabled
              defaultValue
              style={{ display: operator != null ? "none" : "" }}
            >
              {" "}
            </option>
            <option value="Avea">Avea</option>
            <option value="Turkcell">Turkcell</option>
            <option value="Vodafone">Vodafone</option>
          </select>
          <br />

          <label className="sorgu-label" htmlFor="CellId">
            Cell ID
          </label>
          <input
            style={{ width: "150px" }}
            onChange={(event) => onCellIdChange(event)}
            id="CellId"
            required
          />
          <br />

          <input
            type="submit"
            value="Bul"
            style={{ float: "right", marginTop: "10px" }}
            id="submit"
          />
        </form>
      </Box>
      <br />
      <Box component="fieldset" className="sorgu-fieldset">
        <legend className="sorgu-fieldset-legend">Baz İstasyonları</legend>
        <div>
          {OperatorTipi.map((item) => (
            <Fragment key={item}>
              <label className="sorgu-label" htmlFor={item}>
                {item}
              </label>
              <input
                type="checkbox"
                id={item}
                style={{ width: "20px", height: "20px" }}
                onChange={(event) => onBazListeOperatorChange(event, item)}
              />
              <br />
            </Fragment>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default BazSorguPanel;
