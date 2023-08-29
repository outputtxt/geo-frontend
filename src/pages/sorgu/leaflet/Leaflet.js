import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Leaflet.css";

const Leaflet = ({ width, height, draggable }) => {
  const [layer, setLayer] = useState(false);
  const position = [39.925018, 32.836956];
  const [map, setMap] = useState(null);

  useEffect(() => {
    //console.log("Height: " + props.height + ", Width: " + props.width);
    if (map != null) {
      map.invalidateSize();
    }
  }, [height, width]);

  useEffect(() => {
    if (map != null) {
      console.log(map);
      //map.setZoom(map.getZoom() + 1);
    }
  }, [map]);

  useEffect(() => {
    if (map != null) {
      if (draggable) {
        map.dragging.enable();
      } else {
        map.dragging.disable();
      }
    }
  }, [draggable]);

  return (
    <div className="leaflet-container">
      <MapContainer
        ref={setMap}
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        attributionControl={false}
        zoomControl={false}
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
      </MapContainer>
    </div>
  );
};

export default Leaflet;
