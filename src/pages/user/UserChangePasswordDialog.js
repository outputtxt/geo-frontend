import { useState } from "react";
import { useSnapshot } from "valtio";
import { authInfoStore, visibilityStore } from "../../util/CoreStore";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Constants from "../../util/Constants";
import { StyledEngineProvider } from "@mui/material/styles";
import { showError } from "../../components/CustomDialog";
import AuthService from "../../service/auth.service";

const UserChangePasswordDialog = () => {
  const { openChangePasswordDialog } = useSnapshot(visibilityStore);
  const { username, jwtToken } = useSnapshot(authInfoStore);
  const [newPassword, setNewPassword] = useState(null);
  const [newPassword2, setNewPassword2] = useState(null);

  const handleClose = () => {
    visibilityStore.openChangePasswordDialog = false;
  };

  const handleChangePasswordClick = () => {
    if (newPassword == null || newPassword.length < Constants.PASSWORD_LENGTH) {
      showError(
        "Şifre " + Constants.PASSWORD_LENGTH + " karakterden küçük olamaz!",
      );
    } else if (newPassword !== newPassword2) {
      showError("Şifre tekrar girişi hatalı!");
    } else {
      AuthService.changePassword(
        username,
        newPassword,
        jwtToken,
        setOpenDialog,
      );
    }
  };

  return (
    <Dialog open={openChangePasswordDialog} onClose={handleClose}>
      <DialogTitle align="center">Şifre Güncelle</DialogTitle>
      <DialogContent>
        <TextField
          disabled={true}
          autoFocus
          margin="dense"
          variant="outlined"
          id="username"
          label="Kullanıcı Adı"
          fullWidth
          value={username}
        />
        <TextField
          defaultValue=""
          autoComplete="new-password"
          autoFocus
          margin="dense"
          variant="outlined"
          id="newPassword"
          label="Şifre"
          type="password"
          fullWidth
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          defaultValue=""
          autoComplete="new-password"
          autoFocus
          margin="dense"
          variant="outlined"
          id="newPassword2"
          label="Şifre Tekrar"
          type="password"
          fullWidth
          onChange={(e) => setNewPassword2(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <StyledEngineProvider injectFirst>
          <Button onClick={handleClose} className="sorgu-button">
            İptal
          </Button>
          <Button
            onClick={handleChangePasswordClick}
            className="sorgu-button"
            style={{ marginLeft: "20px", marginRight: "40px" }}
          >
            Güncelle
          </Button>
        </StyledEngineProvider>
      </DialogActions>
    </Dialog>
  );
};

export default UserChangePasswordDialog;
