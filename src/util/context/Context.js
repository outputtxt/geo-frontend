import { useState, createContext, useMemo } from "react";

// export const SerivceContext = createContext({
//   mapService: undefined
// });

// export const ServiceContextProvider = ({children}) => {
//   //const mapService = new MapService();

//   return (
//     // <SideBarContext.Provider value={{ mapService }}>
//     //   {children}
//     // </SideBarContext.Provider>
//   );
// };


export const SideBarContext = createContext({
  visible: undefined,
  setVisible: undefined,
  open: undefined,
  setOpen: undefined,
});

export const SideBarContextProvider = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [visible, setVisible] = useState(true);

  return (
    <SideBarContext.Provider value={{ open, setOpen, visible, setVisible }}>
      {children}
    </SideBarContext.Provider>
  );
};

// ==========================  MAP CONTEXT  ==========================
export const MapContext = createContext({
  map: undefined,
  setMap: undefined
});

export const MapContextProvider = ({ children }) => {
  const [map, setMap] = useState(null);
  const mapProvider = useMemo(() => ({ map, setMap }), [map, setMap]);

  return (
    <MapContext.Provider value={{ ...mapProvider }}>
      {children}
    </MapContext.Provider>
  );
};
