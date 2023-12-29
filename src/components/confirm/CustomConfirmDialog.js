import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";

const CustomConfirmDialog = ({
  isOpen,
  onCancel,
  onConfirm,
  title,
  content,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onConfirm}
          variant="contained"
          startIcon={<CheckCircleIcon color="green" />}
          // className="sorgu-button"
          style={{ marginLeft: "15px" }}
        />

        {/* <button onClick={onClose} autoFocus className="sorgu-button">
          Close
        </button> */}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
