import { useState, createContext, createRef } from "react";
import { proxy, ref } from "valtio";


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

// ==========================  MAP CONTEXT - VALTIO  ==========================
export const MapProxy = proxy({
  map: ref(createRef()),
  layers: {
    sorgu: ref(createRef()),
    kestirme: ref(createRef()),
    aveaBazList: ref(createRef()),
    turkcellBazList: ref(createRef()),
    vodafoneBazList: ref(createRef())
  }
});
