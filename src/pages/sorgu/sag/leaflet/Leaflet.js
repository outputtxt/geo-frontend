import { useState, useContext, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  LayersControl,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { MapContext } from "../../../../util/Context";
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

//======================  MAP CONTROLLER  ======================
const MapController = ({ setMousePoint }) => {
  // =================== track mouse coordinates on map ===================
  useMapEvents({
    mousemove(event) {
      setMousePoint(event.latlng);
    },
    mouseout() {
      setMousePoint(null);
    },
  });
};

//=============================  LEAFLET  =============================
const Leaflet = ({ width, height, setMousePoint }) => {
  const mapContext = useContext(MapContext);
  const [layer, setLayer] = useState(false);

  //========== rerender the map for each size change ==========
  useEffect(() => {
    if (mapContext.map != null) {
      mapContext.map.invalidateSize();
    }
  }, [height, width]);

  // const whenMapReady = (map) => {
  // };

  return (
    <div className="leaflet-container">
      <MapContainer
        ref={mapContext.setMap}
        center={[Constants.MAP_START_X, Constants.MAP_START_Y]}
        zoom={13}
        maxZoom={Constants.MAX_ZOOM}
        scrollWheelZoom={true}
        attributionControl={false}
        zoomControl={false}
        preferCanvas={true}
        // whenReady={(map) => whenMapReady(map.target)}
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
            <FeatureGroup ref={mapContext.setLayerSorgu} name="LayerSorgu" />
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Kestirme Katmanı">
            <FeatureGroup
              ref={mapContext.setLayerKestirme}
              name="LayerKestirme"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Avea Baz İstasyonları">
            <FeatureGroup
              name="LayerAveaBazList"
              ref={mapContext.setLayerAveaBazList}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Turkcell Baz İstasyonları">
            <FeatureGroup
              name="LayerTurkcellBazList"
              ref={mapContext.setLayerTurkcellBazList}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Vodafone Baz İstasyonları">
            <FeatureGroup
              name="LayerVodafoneBazList"
              ref={mapContext.setLayerVodafoneBazList}
            />
          </LayersControl.Overlay>
        </LayersControl>

        <MapController setMousePoint={setMousePoint} />
      </MapContainer>
    </div>
  );
};

export default Leaflet;
