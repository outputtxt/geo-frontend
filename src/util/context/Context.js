import { useState, createContext, useMemo } from "react";

export const VisibilityContext = createContext({
  sideBarVisible: undefined,
  setSideBarVisible: undefined,
  sideBarOpen: undefined,
  setSideBarOpen: undefined,
});

export const VisibilityContextProvider = ({ children }) => {
  const [sideBarVisible, setSideBarVisible] = useState(true);
  const [sideBarOpen, setSideBarOpen] = useState(true);

  const sideBarProvider = useMemo(
    () => ({
      sideBarVisible,
      setSideBarVisible,
      sideBarOpen,
      setSideBarOpen,
    }),
    [sideBarVisible, setSideBarVisible, sideBarOpen, setSideBarOpen],
  );

  return (
    <VisibilityContext.Provider value={{ ...sideBarProvider }}>
      {children}
    </VisibilityContext.Provider>
  );
};

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
