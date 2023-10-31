import { useState, useContext, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  LayersControl,
} from "react-leaflet";
import L from "leaflet";
import MapController from "./MapController";
import { MapContext } from "../../../../util/context/Context";
import Constants from "../../../../util/Constants";
import { LeafletConstants } from "../../../../util/Constants";
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
  const mapContext = useContext(MapContext);
  const [layer, setLayer] = useState(false);

  const aveaBazListeOptions = {
    fillColor: LeafletConstants.AVEA_BAZ_COLOR,
    fillOpacity: LeafletConstants.AREA_OPACITY,
    color: "black",
    weight: LeafletConstants.BORDER_WEIGHT,
  };

  const turkcellBazListeOptions = {
    fillColor: LeafletConstants.TURKCELL_BAZ_COLOR,
    fillOpacity: LeafletConstants.AREA_OPACITY,
    color: "black",
    weight: LeafletConstants.BORDER_WEIGHT,
  };

  const vodafoneBazListeOptions = {
    fillColor: LeafletConstants.VODAFONE_BAZ_COLOR,
    fillOpacity: LeafletConstants.AREA_OPACITY,
    color: "black",
    weight: LeafletConstants.BORDER_WEIGHT,
  };

  useEffect(() => {
    if (mapContext.layerAveaBazList != null) {
      mapContext.layerAveaBazList.setStyle(aveaBazListeOptions);
      // map.invalidateSize();
    }
  }, [mapContext.layerAveaBazList]);

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
            <FeatureGroup ref={mapContext.setLayerSorgu} />
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Kestirme Katmanı">
            <FeatureGroup ref={mapContext.setLayerKestirme} />
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Avea Baz İstasyonları">
            <FeatureGroup
              pathOptions={aveaBazListeOptions}
              ref={mapContext.setLayerAveaBazList}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Turkcell Baz İstasyonları">
            <FeatureGroup
              pathOptions={turkcellBazListeOptions}
              ref={mapContext.setLayerTurkcellBazList}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Vodafone Baz İstasyonları">
            <FeatureGroup
              pathOptions={vodafoneBazListeOptions}
              ref={mapContext.setLayerVodafoneBazList}
            />
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
