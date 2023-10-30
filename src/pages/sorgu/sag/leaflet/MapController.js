import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { MapProxy } from "../../../../util/context/Context";
import { useMapEvents } from "react-leaflet";


const MapController = ({ width, height, draggable, setMousePoint }) => {
  const mapState = useSnapshot(MapProxy);

  // const zoomIn = (count) => {
  //   mapState.map.current.setZoom(map.getZoom() + count);
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
    if (mapState.map.current != null) {
      mapState.map.current.invalidateSize();
    }
  }, [height, width]);

  // ******** enable/disable map draggable ********
  useEffect(() => {
    if (mapState.map.current != null) {
      if (draggable) {
        mapState.map.current.dragging.enable();
      } else {
        mapState.map.current.dragging.disable();
      }
    }
  }, [draggable]);

  return null;
};

export default MapController;
