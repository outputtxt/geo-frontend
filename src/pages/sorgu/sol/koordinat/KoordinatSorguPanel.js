import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import { MapContext } from "../../../../util/context/Context";
import { LATITUDE_REGEX, LONGITUDE_REGEX } from "../../../../util/Constants";

const KoordinatSorguPanel = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({mode: "onChange"});
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);

    const { map } = useContext(MapContext);

    const handleKoordinatSubmit = () => {
        map.setView([x, y], map.getZoom());
    }

    const onXChange = (event) => {
        setX(event.target.value);
    }

    const onYChange = (event) => {
        setY(event.target.value);
    }

    return (
        <Box component="fieldset" className="sorgu-fieldset">
            <legend className="sorgu-fieldset-legend">Koordinatlar</legend>

            <form onSubmit={handleSubmit(handleKoordinatSubmit)} style={{lineHeight: "30px"}}>
                <div>
                    <label className="sorgu-label" htmlFor="enlemX">Enlem &nbsp;(X) </label>
                    <input className={errors.enlemX ? 'sorgu-form-data-error' : 'sorgu-form-data-normal'} 
                        value={undefined}
                        type="text"
                        id="enlemX"
                        {...register("enlemX", {
                            onChange: event => onXChange(event),
                            required: true,
                            pattern: LATITUDE_REGEX
                        })}
                    />
                    {/* errors.email.type === "required"    -    errors.email.type === "pattern" */}
                    {errors.enlemX && <p className="sorgu-form-hata-label">Hatalı Enlem!</p> }
                </div>
                <div>
                    <label className="sorgu-label" htmlFor="boylamY">Boylam (Y) </label>
                    <input className={errors.boylamY ? 'sorgu-form-data-error' : 'sorgu-form-data-normal'} 
                        value={undefined}
                        type="text"
                        id="boylamY"
                        {...register("boylamY", {
                            onChange: event => onYChange(event),
                            required: true,
                            pattern: LONGITUDE_REGEX
                        })}
                    />
                    {/* errors.email.type === "required"    -    errors.email.type === "pattern" */}
                    {errors.boylamY && <p className="sorgu-form-hata-label">Hatalı Boylam!</p> }
                </div>
                
                <input type="submit" value="Göster" style={{ float: "right", marginTop:"10px", marginLeft:"10px" }} id="goster"/>
                <input type="button" onClick={() => reset()} value="Temizle" style={{ float: "right", marginTop:"10px" }} id="clear"/>
            </form>
        </Box>
    );
};

export default KoordinatSorguPanel;
