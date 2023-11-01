import { useState, useContext, Fragment } from "react";
import { MapContext } from "../../../../util/context/Context";
import * as L from "leaflet";
import { LeafletConstants } from "../../../../util/Constants";
import BazSorguRestService from "../../../../service/rest/BazSorguRestService";
import useMapService from "../../../../service/MapService";
import useBazSorguService from "../../../../service/BazSorguService";
import OperatorTipi from "../../../../model/enum/OperatorTipi";
import Box from "@mui/material/Box";

const BazSorguPanel = () => {
  const mapContext = useContext(MapContext);
  const { drawBaz } = useMapService();
  const bazSorguService = useBazSorguService();

  const [operator, setOperator] = useState("");
  const [cellId, setCellId] = useState(null);
  // const [aveaCheckBox, setAveaCheckBox] = useState(false);
  // const [turkcellCheckBox, setTurkcellCheckBox] = useState(false);
  // const [vodafoneCheckBox, setVodafoneCheckBox] = useState(false);

  // =======================  CELL BUL FUNCTIONS  =======================
  const handleCellBulSubmit = (event) => {
    event.preventDefault();
    bazSorguService.bazSorgu(operator, cellId);
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
        bazListeLayer = mapContext.layerAveaBazList;
        break;
      case OperatorTipi[1]:
        bazListeLayer = mapContext.layerTurkcellBazList;
        break;
      case OperatorTipi[2]:
        bazListeLayer = mapContext.layerVodafoneBazList;
        break;
    }

    bazListeLayer = bazListeLayer;

    if (event.target.checked) {
      var bazColor =
        LeafletConstants.OPERATOR_BAZ_COLOR_MAP.get(bazListeOperator);
      var cellLocationListe =
        BazSorguRestService.bazListeSorgula(bazListeOperator);

      cellLocationListe.map((cellLocation) => {
        drawBaz(
          bazListeLayer,
          cellLocation.X,
          cellLocation.Y,
          cellLocation.angle,
          cellLocation.adres,
          bazColor,
        );

        // BAZ CENTER POINT
        L.circle([cellLocation.X, cellLocation.Y], 2, {
          fillColor: bazColor,
          fillOpacity: 1,
          color: bazColor,
        }).addTo(bazListeLayer);
      });

      mapContext.map.fitBounds(bazListeLayer.getBounds());

      if (mapContext.map.dragging.enabled) {
        mapContext.map.dragging.disable();
        mapContext.map.dragging.enable();
      } else {
        mapContext.map.dragging.disable();
        mapContext.map.dragging.enable();
      }

      console.log(mapContext.map);
      console.log(bazListeLayer);

      // const evt = new Event("mouseenter");
      mapContext.map.fireEvent("mouseout");
      // mapContext.map.off();
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
