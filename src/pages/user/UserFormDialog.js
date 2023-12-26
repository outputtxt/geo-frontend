import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import CustomDialog from "../../components/CustomDialog";

const UserFormDialog = ({ openDialog, setOpenDialog }) => {
  const handleClose = () => {
    console.log("handle close");
  };

  const [loading, setLoading] = useState(false);
  // const [openDialog, setOpenDialog] = useState(false);
  const [dialogText, setDialogText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPostParams(postParams);
    const apiResponse = await handleSaveUser("newsletter__form", object);

    setDialogText(apiResponse);
    setOpenDialog(true);
    setLoading(false);
  };

  return (
    <CustomDialog
      isOpen={openDialog}
      onClose={handleClose}
      title="Some title"
      content={dialogText}
    />
  );

  // return (
  //   <Dialog open={true} onClose={handleClose}>
  //     <DialogTitle>{props.title}</DialogTitle>
  //     <DialogContent>
  //       <DialogContentText>
  //         To subscribe to this website, please enter your email address here. We
  //         will send updates occasionally.
  //       </DialogContentText>

  //       <InputLabel htmlFor="username">Kullanıcı Adı</InputLabel>
  //       <TextField
  //         autoFocus
  //         margin="dense"
  //         id="username"
  //         label="Email Address"
  //         type="email"
  //         fullWidth
  //         variant="standard"
  //       />
  //     </DialogContent>
  //     <DialogActions>
  //       <Button onClick={handleClose}>Cancel</Button>
  //       <Button onClick={handleClose}>Subscribe</Button>
  //     </DialogActions>
  //   </Dialog>
  // );
};

export default UserFormDialog;
