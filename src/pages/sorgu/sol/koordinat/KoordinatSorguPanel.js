import { useState } from "react";
import Box from "@mui/material/Box";

const KoordinatSorguPanel = () => {
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);

    const handleKoordinatSubmit = (event) => {
        event.preventDefault();
        alert("Koordinat: ["+ x + ", " + y + "]");
        const enlem = document.getElementById("enlem");
        enlem.classList.add("invalid");
        return false;
    }

    const onXChange = (event) => {
        setX(event.target.value);
        event.preventDefault();
    }

    const onYChange = (event) => {
        setY(event.target.value);
        event.preventDefault();
    }

    return (
        <Box component="fieldset" className="sorgu-fieldset">
            <legend className="sorgu-fieldset-legend">Koordinatlar</legend>
            <form onSubmit={event => handleKoordinatSubmit(event)} style={{lineHeight: "30px"}}>
                <label className="sorgu-label" htmlFor="enlem">Enlem (X) </label>
                <input style={{ width:"150px" }} onChange={event => onXChange(event)} id="enlem" required 
                    onInvalid={e => e.target.setCustomValidity("Lütfen Enlem Giriniz !")}
                    onInput={e => e.target.setCustomValidity('')} 
                    name="X"
                    pattern="/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/"
                    />
                <br/>
                <label className="sorgu-label" htmlFor="boylam" sty>Boylam (Y) </label>
                <input style={{ width:"150px" }} onChange={event => onYChange(event)} id="boylam" required 
                    onInvalid={e => e.target.setCustomValidity("Lütfen Boylam Giriniz !")}
                    onInput={e => e.target.setCustomValidity('')}
                    type="text"
                    name="Y"
                    pattern="/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/"/>
                <br/>
                <input type="submit" value="Göster" style={{ float: "right", marginTop:"10px" }} id="goster"/>
            </form>
        </Box>
    );
};

export default KoordinatSorguPanel;