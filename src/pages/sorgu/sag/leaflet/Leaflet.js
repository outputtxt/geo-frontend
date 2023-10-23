import { useState, useEffect, useRef, useContext } from "react";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import MapController from "./MapController";
import { MapContext } from "../../../../util/context/Context";
import Constants from "../../../../util/Constants";
import "leaflet/dist/leaflet.css";
import "./Leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Leaflet = ({ width, height, draggable, setMousePoint }) => {
  const { setMap, setFeatureGroupRef, setKestirmeFeatureGroupRef } =
    useContext(MapContext);
  const [layer, setLayer] = useState(false);
  const position = [Constants.MAP_START_X, Constants.MAP_START_Y];

  // useEffect(() => {
  //   if (map != null) {
  //     //console.log(map);
  //     //map.setZoom(map.getZoom() + 1);
  //   }
  // }, [map]);

  return (
    <div className="leaflet-container">
      <MapContainer
        ref={setMap}
        center={position}
        zoom={13}
        maxZoom={Constants.MAX_ZOOM}
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

        <FeatureGroup ref={setFeatureGroupRef} />

        <FeatureGroup ref={setKestirmeFeatureGroupRef} />

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
