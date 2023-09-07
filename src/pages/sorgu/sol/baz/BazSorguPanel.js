import { useState } from "react";
import { Operator } from "../../../../util/Constants";
import Box from "@mui/material/Box";
import { v4 as uuidv4 } from 'uuid';

const BazSorguPanel = () => {
    const [operator, setOperator] = useState("");
    const [cellId, setCellId] = useState(null);
    const [aveaCheckBox, setAveaCheckBox] = useState(false);
    const [turkcellCheckBox, setTurkcellCheckBox] = useState(false);
    const [vodafoneCheckBox, setVodafoneCheckBox] = useState(false);

    // =======================  CELL BUL FUNCTIONS  =======================
    const handleCellBulSubmit = event => {
        event.preventDefault();
        alert('Operator: [' + operator + "], cellId: ["+ cellId + "].");
    }

    const onOperatorChange = event => {
        event.preventDefault();
        setOperator(event.target.value);
    }

    const onCellIdChange = (event) => {
        event.target.value = event.target.value.replace(/[^0-9]/g,'');
        setCellId(event.target.value);
        event.preventDefault();
    }

    // =======================  BAZ ISTASYONLARI FUNCTIONS  =======================
    const onBazIstasyonuChange = (event, baz) => {
        alert(baz);
    }
    
    return (
    <div>
        <Box component="fieldset" className="sorgu-fieldset" id={uuidv4()}>
            <legend className="sorgu-fieldset-legend" id={uuidv4()}>Cell Bul</legend>
            <form onSubmit={event => handleCellBulSubmit(event)} style={{lineHeight: "30px"}}>
                <label className="sorgu-label" htmlFor="operatorSelect"> Operatör </label>
                <select value={operator} onChange={onOperatorChange} style={{ width:"150px" }} id="operatorSelect" required >
                    <option disabled defaultValue style={{display: operator != null ? "none" : "" }}> </option>
                    <option value="Avea">Avea</option>
                    <option value="Turkcell">Turkcell</option>
                    <option value="Vodafone">Vodafone</option>
                </select>
                <br/>

                <label className="sorgu-label" htmlFor="CellId"> Cell ID </label>
                <input style={{ width:"150px" }} onChange={event => onCellIdChange(event)} id="CellId" required />
                <br/>

                <input type="submit" value="Bul" style={{ float: "right", marginTop:"10px" }} id="submit"/>
            </form>
        </Box>
        <br/>
        <Box component="fieldset" className="sorgu-fieldset" id={uuidv4()}>
            <legend className="sorgu-fieldset-legend" id={uuidv4()}>Baz İstasyonları</legend>
            <div>

                { Operator.map(item => (
                    <>
                    <label className="sorgu-label" htmlFor={item}> {item}</label>
                    <input type="checkbox" id={item} style={{width: "20px", height:"20px"}}
                            onChange={event => onBazIstasyonuChange(event, item)}/>
                    <br/>
                    </>
                )) }
            </div>
        </Box>
    </div>
    );
};

export default BazSorguPanel;