import { useState, useEffect, useRef, useContext } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import MapController from "./MapController";
import { MapContext } from "../../../../util/context/Context";
import { MAX_ZOOM } from "../../../../util/Constants";
import "leaflet/dist/leaflet.css";
import "./Leaflet.css";

const Leaflet = ({ width, height, draggable, setMousePoint }) => {
  const [layer, setLayer] = useState(false);
  const position = [39.925018, 32.836956];
  // const [map, setMap] = useState(null);

  // useEffect(() => {
  //   if (map != null) {
  //     //console.log(map);
  //     //map.setZoom(map.getZoom() + 1);
  //   }
  // }, [map]);

  const { setMap } = useContext(MapContext);

  return (
    <div className="leaflet-container">
      <MapContainer
        ref={setMap}
        center={position}
        zoom={13}
        maxZoom={MAX_ZOOM}
        scrollWheelZoom={true}
        attributionControl={false}
        zoomControl={false}
        preferCanvas={true}
      >
        {layer ? (
          <WMSTileLayer
            layers={"ankara:ANKARA"}
            url="http://localhost:8040/geoserver/wms"
          />
        ) : (
          /*<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */
          <TileLayer url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}" />
        )}

        {/*}
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        */}

        <MapController
          width={width}
          height={height}
          draggable={draggable}
          setMousePoint={setMousePoint}
        />
      </MapContainer>
    </div>
  );
};

export default Leaflet;
