import { useEffect, useContext } from "react";
import { MapContext } from "../../../../util/Context";
import { useMapEvents } from "react-leaflet";

const MapController = ({ width, height, draggable, setMousePoint }) => {
  const { map } = useContext(MapContext);

  // const zoomIn = (count) => {
  //   map.setZoom(map.getZoom() + count);
  // };

  // ******** track mouse coordinates on map ********
  useMapEvents({
    mousemove(event) {
      setMousePoint(event.latlng);
    },
    mouseout() {
      setMousePoint(null);
    },
  });

  // ******** rerender the map for each size change ********
  useEffect(() => {
    if (map != null) {
      map.invalidateSize();
    }
  }, [height, width]);

  // ******** enable/disable map draggable ********
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
};

export default MapController;
