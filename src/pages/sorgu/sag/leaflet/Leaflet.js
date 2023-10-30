import { useState } from "react";
import { useSnapshot } from "valtio";
import { MapContainer, TileLayer, FeatureGroup, LayersControl } from "react-leaflet";
import L from "leaflet";
import MapController from "./MapController";
import { MapProxy } from "../../../../util/context/Context";
import Constants from "../../../../util/Constants";
import "leaflet/dist/leaflet.css";
import "./Leaflet.css";

//***************  bug fix for Leaflet Default Icon  ***************
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

//=============================  LEAFLET  =============================
const Leaflet = ({ width, height, draggable, setMousePoint }) => {
  const mapState = useSnapshot(MapProxy);
  const [layer, setLayer] = useState(false);
  
  return (
    <div className="leaflet-container">
      <MapContainer
        ref={mapState.map}
        center={[Constants.MAP_START_X, Constants.MAP_START_Y]}
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

      <LayersControl position="topright">
        <LayersControl.Overlay checked name="Sorgu Katmanı">
          <FeatureGroup ref={mapState.layers.sorgu} />
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Kestirme Katmanı">
          <FeatureGroup ref={mapState.layers.kestirme} />
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Avea Baz İstasyonları">
          <FeatureGroup ref={mapState.layers.aveaBazList} />
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Turkcell Baz İstasyonları">
          <FeatureGroup ref={mapState.layers.turkcellBazList} />
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Vodafone Baz İstasyonları">
          <FeatureGroup ref={mapState.layers.vodafoneBazList} />
        </LayersControl.Overlay>
      </LayersControl>

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
