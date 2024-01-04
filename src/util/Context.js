import { useState, createContext, useMemo } from "react";

// ==========================  CONTENT CONTEXT  ==========================
export const ContentContext = createContext({
  contentData: undefined,
  setContentData: undefined,
  contentHeader: undefined,
  setContentHeader: undefined,
  contentOpen: undefined,
  setContentOpen: undefined,
});

export const ContentContextProvider = ({ children }) => {
  const [contentData, setContentData] = useState();
  const [contentHeader, setContentHeader] = useState();
  const [contentOpen, setContentOpen] = useState(false);

  const contentProvider = useMemo(
    () => ({
      contentData,
      setContentData,
      contentHeader,
      setContentHeader,
      contentOpen,
      setContentOpen,
    }),
    [
      contentData,
      setContentData,
      contentHeader,
      setContentHeader,
      contentOpen,
      setContentOpen,
    ],
  );

  return (
    <ContentContext.Provider value={{ ...contentProvider }}>
      {children}
    </ContentContext.Provider>
  );
};

// ==========================  VISIBILITY CONTEXT  ==========================
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
