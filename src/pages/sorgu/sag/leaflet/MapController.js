import { useEffect, useContext } from "react";
import { MapContext } from "../../../../util/context/Context";
//import { useMap } from "react-leaflet";

const MapController = ({ width, height, draggable }) => {
  const { map } = useContext(MapContext);
  const flyToDuration = 1.5;

  const zoomIn = (count) => {
    map.setZoom(map.getZoom() + count);
  };

  // const changeDraggable = (draggable) => {
  //   if (map != null) {
  //     if (draggable) {
  //       map.dragging.enable();
  //     } else {
  //       map.dragging.disable();
  //     }
  //   }
  // };

  useEffect(() => {
    if (map != null) {
      map.invalidateSize();
    }
  }, [height, width]);

  // useEffect(() => {
  //   if (map != null) {
  //     if (draggable) {
  //       map.dragging.enable();
  //     } else {
  //       map.dragging.disable();
  //     }
  //   }
  // }, [draggable]);

  return null;
};

export default MapController;