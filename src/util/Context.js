import { useState, createContext, useMemo } from "react";

// ==========================  MAP CONTEXT  ==========================
export const MapContext = createContext({
  map: undefined,
  setMap: undefined,
  layerSorgu: undefined,
  setLayerSorgu: undefined,
  layerKestirme: undefined,
  setLayerKestirme: undefined,
  layerAveaBazList: undefined,
  setLayerAveaBazList: undefined,
  layerTurkcellBazList: undefined,
  setLayerTurkcellBazList: undefined,
  layerVodafoneBazList: undefined,
  setLayerVodafoneBazList: undefined,
});

export const MapContextProvider = ({ children }) => {
  const [map, setMap] = useState(null);
  const [layerSorgu, setLayerSorgu] = useState(null);
  const [layerKestirme, setLayerKestirme] = useState(null);
  const [layerAveaBazList, setLayerAveaBazList] = useState(null);
  const [layerTurkcellBazList, setLayerTurkcellBazList] = useState(null);
  const [layerVodafoneBazList, setLayerVodafoneBazList] = useState(null);

  const mapProvider = useMemo(
    () => ({
      map,
      setMap,
      layerSorgu,
      setLayerSorgu,
      layerKestirme,
      setLayerKestirme,
      layerAveaBazList,
      setLayerAveaBazList,
      layerTurkcellBazList,
      setLayerTurkcellBazList,
      layerVodafoneBazList,
      setLayerVodafoneBazList,
    }),
    [
      map,
      setMap,
      layerSorgu,
      setLayerSorgu,
      layerKestirme,
      setLayerKestirme,
      layerAveaBazList,
      setLayerAveaBazList,
      layerTurkcellBazList,
      setLayerTurkcellBazList,
      layerVodafoneBazList,
      setLayerVodafoneBazList,
    ],
  );

  return (
    <MapContext.Provider value={{ ...mapProvider }}>
      {children}
    </MapContext.Provider>
  );
};
