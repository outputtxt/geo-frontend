import { useState, createContext } from "react";

export const SideBarContext = createContext({
  visible: undefined,
  setVisible: undefined,
  open: undefined,
  setOpen: undefined
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
