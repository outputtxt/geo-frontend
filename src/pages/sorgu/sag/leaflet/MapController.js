import { useEffect, useContext } from "react";
import { MapContext } from "../../../../util/context/Context";
import { useMapEvents } from "react-leaflet";
// import L from "leaflet";
import * as L from "leaflet";

const MapController = ({ width, height, draggable, setMousePoint }) => {
  const { map, featureGroupRef } = useContext(MapContext);
  const flyToDuration = 1.5;

  const zoomIn = (count) => {
    map.setZoom(map.getZoom() + count);
  };

  const circle = L.circle([39.935671, 32.804489], {
    color: "gold",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 200,
  });

  // const changeDraggable = (draggable) => {
  //   if (map != null) {
  //     if (draggable) {
  //       map.dragging.enable();
  //     } else {
  //       map.dragging.disable();
  //     }
  //   }
  // };

  useMapEvents({
    mousemove(event) {
      setMousePoint(event.latlng);
    },
    mouseout() {
      setMousePoint(null);
    },
  });

  useEffect(() => {
    if (map != null) {
      map.invalidateSize();
    }
  }, [height, width]);

  useEffect(() => {
    if (map != null) {
      if (draggable) {
        map.dragging.enable();

        featureGroupRef.clearLayers();
      } else {
        map.dragging.disable();
        featureGroupRef.addLayer(circle);
      }

      // const sector = L.sector({
      //   center: [39.935671, 32.804489],
      //   innerRadius: 500,
      //   outerRadius: 1000,
      //   startBearing: 180,
      //   endBearing: 270,
      //   color: "green",
      // }).addTo(map);
    }
  }, [draggable]);

  return null;
};

export default MapController;
