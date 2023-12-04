import { useState, Fragment } from "react";
import useBazSorguService from "../../../../service/BazSorguService";
import OperatorTipi from "../../../../model/enum/OperatorTipi";
import Box from "@mui/material/Box";

const BazSorguPanel = () => {
  const bazSorguService = useBazSorguService();

  const [operator, setOperator] = useState("");
  const [cellId, setCellId] = useState(null);

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
  const onBazListeOperatorChange = (event, operator) => {
    bazSorguService.bazListeGoster(operator, event.target.checked);
  };

  return (
    <div>
      <Box component="fieldset" className="sorgu-fieldset">
        {/* <legend className="sorgu-fieldset-legend">Cell Bul</legend> */}
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
            style={{ width: "152px" }}
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
            <option value="TurkTelekom">TurkTelekom</option>
            <option value="Turkcell">Turkcell</option>
            <option value="Vodafone">Vodafone</option>
          </select>
          <br />

          <label className="sorgu-label" htmlFor="CellId">
            Cell ID
          </label>
          <input
            className="reset"
            style={{ width: "145px" }}
            onChange={(event) => onCellIdChange(event)}
            id="CellId"
            required
          />
          <br />

          <input
            type="submit"
            value="Bul"
            style={{ float: "right", marginTop: "10px", marginBottom: "10px" }}
            className="sorgu-button"
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
              <label className="sorgu-label" htmlFor={item + "BazListCheckbox"}>
                {item}
              </label>
              <input
                type="checkbox"
                id={item + "BazListCheckbox"}
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
