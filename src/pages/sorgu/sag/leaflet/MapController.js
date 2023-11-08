import { useEffect, useContext } from "react";
import { MapContext } from "../../../../util/Context";
import { useMapEvents } from "react-leaflet";

const MapController = ({ width, height, setMousePoint }) => {
  const { map } = useContext(MapContext);

  // =================== track mouse coordinates on map ********
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

  return null;
};

export default MapController;
