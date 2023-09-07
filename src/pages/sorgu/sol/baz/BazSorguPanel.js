import { useState, Button } from "react";
import { Operator } from "../../../../util/Constants";
import Box from "@mui/material/Box";

const BazSorguPanel = () => {
    const [operator, setOperator] = useState(null);
    const [cellId, setCellId] = useState(null);
    const [aveaCheckBox, setAveaCheckBox] = useState(false);
    const [turkcellCheckBox, setTurkcellCheckBox] = useState(false);
    const [vodafoneCheckBox, setVodafoneCheckBox] = useState(false);

    const handleCellBulSubmit = event => {
        event.preventDefault();
        alert('Operator: [' + operator + "], cellId: ["+ cellId + "].");
    }

    const onOperatorChange = event => {
        event.preventDefault();
        console.log(event);
        setOperator(event.target.value);
    }

    const onKeyDown = evt => {
        // Only allow if the e.key value is a number or if it's 'Backspace'
        // if(isNaN(event.key) && event.key !== 'Backspace') {
        //     event.preventDefault();
        // }

        var e = evt || window.event;
    var key = e.keyCode || e.which;

    if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
    // numbers   
    key >= 48 && key <= 57 ||
    // Numeric keypad
    key >= 96 && key <= 105 ||
    // Backspace and Tab and Enter
    key == 8 || key == 9 || key == 13 ||
    // Home and End
    key == 35 || key == 36 ||
    // left and right arrows
    key == 37 || key == 39 ||
    // Del and Ins
    key == 46 || key == 45) {
        // input is VALID
    }
    else {
        // input is INVALID
        e.returnValue = false;
        if (e.preventDefault) e.preventDefault();
    }
    }

    

    return (
        <div>
            <Box component="fieldset" className="sorgu-fieldset">
                <legend className="sorgu-fieldset-legend">Cell Bul</legend>
                    <form onSubmit={event => handleCellBulSubmit(event)} style={{lineHeight: "30px"}}>
                        <label className="sorgu-label"> Operatör </label>
                        <select value={operator} onChange={onOperatorChange} style={{ width:"150px" }}>
                            <option disabled selected value style={{display: operator != null ? "none" : "" }}> </option>
                            <option value="Avea">Avea</option>
                            <option value="Turkcell">Turkcell</option>
                            <option value="Vodafone">Vodafone</option>
                        </select>
                        <br/>

                        <label className="sorgu-label"> Cell ID </label>
                        <input style={{ width:"150px" }} 
                           onKeyDown={event => onKeyDown(event)}
                              
                           />
                        <br/>                        

                        <input type="submit" value="Bul" style={{ float: "right", marginTop:"10px" }}/>
                    </form>
            </Box>
            <br/>
            <Box component="fieldset" className="sorgu-fieldset">
                <legend className="sorgu-fieldset-legend">Baz İstasyonları</legend>
                    Box content goes here.
            </Box>
        </div>
    );
};

export default BazSorguPanel;