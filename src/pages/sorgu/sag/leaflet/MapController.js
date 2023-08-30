import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapController = ({ width, height, draggable }) => {
    const map = useMap();
    const flyToDuration = 1.5;

    const zoomIn = (count) => {
        map.setZoom(map.getZoom() + count);
    };

    useEffect(() => {
        if (map != null) {
          map.invalidateSize();
        }
      }, [height, width]);

      useEffect(() => {
        if (map != null) {
          if (draggable) {
            map.dragging.enable();
          } else {
            map.dragging.disable();
          }
        }
      }, [draggable]);

    return null;
}

export default MapController;