import { useState, useRef, useContext, createContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const ConfirmContext = createContext();

export const useConfirm = () => useContext(ConfirmContext);

export const ConfirmServiceProvider = ({ children }) => {
  const [options, setOptions] = useState(null);
  const awaitingPromiseRef = useRef(null);

  const openModal = options => {
    setOptions(options);
    return new Promise((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  };

  const handleClose = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.reject();
    }
    setOptions(null);
  };

  const handleConfirm = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve();
    }
    setOptions(null);
  };

  return (
    <>
      <ConfirmContext.Provider value={openModal} children={children} />

      <Dialog open={Boolean(options)}>
        <DialogTitle>
          {options && options.title ? options.title : ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{options && options.text ? options.text : ""}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="logoutBtn"
            onClick={handleClose}
            style={{
              background: "transparent",
              border: "none",
              color: "darkred",
            }}
          >
            <CancelIcon fontSize="large"/>
          </button>
          <button
            className="logoutBtn"
            onClick={handleConfirm}
            style={{
              background: "transparent",
              border: "none",
              color: "darkgreen",
              marginLeft: "10px"
            }}
          >
            <CheckCircleIcon fontSize="large"/>
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};
