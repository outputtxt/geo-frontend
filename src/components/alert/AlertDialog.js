import { proxy, useSnapshot } from "valtio";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import Button from "@mui/material/Button";
import { IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

//================  STORE  ================
export const alertInfoStore = proxy({
  open: false,
  title: "",
  text: "",
  type: "info", // info, warn, error, null
});

//================  FUNCTION  ================
export const showAlert = (title, text, type) => {
  alertInfoStore.title = title;
  alertInfoStore.text = text;
  alertInfoStore.type = type;
  alertInfoStore.open = true;
};

//================  DIALOG  ================
const AlertDialog = () => {
  const alertStore = useSnapshot(alertInfoStore);

  const handleClose = () => {
    alertInfoStore.open = false;
  };

  return (
    <Dialog
      open={alertStore.open}
      onClose={handleClose}
      sx={{
        ".MuiPaper-root": { padding: 3 },
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
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <DialogContentText>
          {alertStore.text ? alertStore.text : ""}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Tamam</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
