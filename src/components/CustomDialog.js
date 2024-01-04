import { proxy, useSnapshot } from "valtio";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";
import { IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

//================  STORE  ================
export const confirmInfoStore = proxy({
  open: false,
  title: "",
  text: "",
  awaitingPromise: undefined,
});

export const alertInfoStore = proxy({
  open: false,
  title: "",
  text: "",
  type: "info", // info, warn, error, null
});

//================  FUNCTION  ================
export const showConfirm = (title, text) => {
  if (text !== undefined) {
    confirmInfoStore.title = title;
    confirmInfoStore.text = text;
  } else {
    confirmInfoStore.title = "";
    confirmInfoStore.text = title;
  }

  confirmInfoStore.open = true;

  return new Promise((resolve, reject) => {
    confirmInfoStore.awaitingPromise = { resolve, reject };
  });
};

export const showAlert = (title, text, type) => {
  if (text !== undefined) {
    alertInfoStore.title = title;
    alertInfoStore.text = text;
  } else {
    alertInfoStore.title = "";
    alertInfoStore.text = title;
  }

  if (type !== undefined) {
    alertInfoStore.type = type;
  }

  alertInfoStore.open = true;
};
export const showInfo = (title, text) => {
  if (text === undefined) {
    text = title;
    title = "BİLGİ";
  }
  showAlert(title, text, "info");
};

export const showWarning = (title, text) => {
  if (text === undefined) {
    text = title;
    title = "UYARI";
  }
  showAlert(title, text, "warn");
};

export const showError = (title, text) => {
  if (text === undefined) {
    text = title;
    title = "HATA";
  }
  showAlert(title, text, "error");
};

//================  COMPONENT  ================
const CustomDialog = () => {
  const confirmStore = useSnapshot(confirmInfoStore);
  const alertStore = useSnapshot(alertInfoStore);

  const handleConfirmClose = () => {
    confirmInfoStore.title = "";
    confirmInfoStore.text = "";
    confirmInfoStore.open = false;

    if (confirmInfoStore.awaitingPromise) {
      confirmInfoStore.awaitingPromise.reject();
    }
  };

  const handleConfirm = () => {
    confirmInfoStore.title = "";
    confirmInfoStore.text = "";
    confirmInfoStore.open = false;

    if (confirmInfoStore.awaitingPromise) {
      confirmInfoStore.awaitingPromise.resolve();
    }
  };

  const handleAlertClose = () => {
    alertInfoStore.title = "";
    alertInfoStore.text = "";
    alertInfoStore.type = "";
    alertInfoStore.open = false;
  };

  return (
    <>
      <Dialog
        open={confirmStore.open}
        onClose={handleConfirmClose}
        sx={{ "& .MuiDialog-paper": { minWidth: "35%" } }}
      >
        <DialogTitle>
          {confirmStore.title ? confirmStore.title : ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmStore.text ? confirmStore.text : ""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="logoutBtn"
            onClick={handleConfirmClose}
            style={{
              background: "transparent",
              border: "none",
              color: "darkred",
            }}
          >
            <CancelIcon fontSize="large" />
          </button>
          <button
            className="logoutBtn"
            onClick={handleConfirm}
            style={{
              background: "transparent",
              border: "none",
              color: "darkgreen",
              marginLeft: "10px",
            }}
          >
            <CheckCircleIcon fontSize="large" />
          </button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={alertStore.open}
        onClose={handleAlertClose}
        sx={{
          ".MuiPaper-root": { padding: 1 },
          "& .MuiDialog-paper": { minWidth: "35%" },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <DialogTitle>
            {alertStore.type === "info" && (
              <InfoIcon style={{ color: "green", marginRight: "10px" }} />
            )}
            {alertStore.type === "warn" && (
              <WarningIcon style={{ color: "#ffd300", marginRight: "10px" }} />
            )}
            {alertStore.type === "error" && (
              <ErrorIcon style={{ color: "red", marginRight: "10px" }} />
            )}
            {alertStore.title ? alertStore.title : ""}
          </DialogTitle>
          <IconButton onClick={handleAlertClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <DialogContentText>
            {alertStore.text ? alertStore.text : ""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose}>Tamam</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomDialog;
