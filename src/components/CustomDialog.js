import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./CustomDialog.css";

const CustomDialog = ({ isOpen, onClose, title, content }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      {/* <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent> */}
      {content}

      <DialogActions>
        <button onClick={onClose} autoFocus className="sorgu-button">
          Close
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
