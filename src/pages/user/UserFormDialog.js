import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { StyledEngineProvider } from "@mui/material/styles";

const UserFormDialog = ({ openDialog, setOpenDialog }) => {
  const [dialogTitle, setDialogTitle] = useState("");

  const [username, setUsername] = useState("yasin");
  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [active, setActive] = useState(true);
  const [role, setRole] = useState(null);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSaveOrUpdate = () => {
    console.log(
      "username: %s, password: %s, password2: %s, active: %s, role: %s",
      username,
      password,
      password2,
      active,
      role,
    );
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   setPostParams(postParams);
  //   const apiResponse = await handleSaveUser("newsletter__form", object);

  //   setDialogText(apiResponse);
  //   setOpenDialog(true);
  // };

  return (
    <Dialog open={openDialog} onClose={handleClose}>
      <DialogTitle align="center">Yeni Kullanıcı Ekle</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          variant="outlined"
          id="username"
          label="Kullanıcı Adı"
          type="email"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          variant="outlined"
          id="password"
          label="Şifre"
          type="password"
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          variant="outlined"
          id="password2"
          label="Şifre Tekrar"
          type="password"
          fullWidth
          onChange={(e) => setPassword2(e.target.value)}
        />

        <div className="form-fieldset">
          <FormControlLabel
            value={active}
            control={
              <Checkbox
                style={{ marginLeft: "120px" }}
                onChange={(e) => setActive(e.target.value)}
              />
            }
            label={
              <Typography variant="body1" color="textSecondary">
                Aktif
              </Typography>
            }
            labelPlacement="start"
            style={{ margin: "5px" }}
          />
        </div>

        <div className="form-fieldset" style={{ marginTop: "12px" }}>
          <FormLabel id="rolRadioGroup" style={{ margin: "5px" }}>
            Roller
          </FormLabel>

          <RadioGroup
            aria-labelledby="rolRadioGroup"
            name="rolRadio"
            defaultValue="roleOnleyici"
            style={{ marginLeft: "120px" }}
            onChange={(e, value) => setRole(value)}
          >
            <FormControlLabel
              value="roleAdmin"
              control={<Radio />}
              label="Admin"
              style={{ marginTop: "-7px" }}
            />
            <FormControlLabel
              value="roleQueryAdmin"
              control={<Radio />}
              label="Query Admin"
              style={{ marginTop: "-7px" }}
            />
            <FormControlLabel
              value="roleLeaQueryAdmin"
              control={<Radio />}
              label="LEA Query Admin"
              style={{ marginTop: "-7px" }}
            />
            <FormControlLabel
              value="roleAdliAdmin"
              control={<Radio />}
              label="Adli Admin"
              style={{ marginTop: "-7px" }}
            />
            <FormControlLabel
              value="roleOnleyiciAdmin"
              control={<Radio />}
              label="Önleyici Admin"
              style={{ marginTop: "-7px" }}
            />
            <FormControlLabel
              value="roleAdli"
              control={<Radio />}
              label="Adli"
            />
            <FormControlLabel
              value="roleOnleyici"
              control={<Radio />}
              label="Önleyici"
              style={{ marginTop: "-7px" }}
            />
          </RadioGroup>
        </div>
      </DialogContent>
      <DialogActions>
        <StyledEngineProvider injectFirst>
          <Button onClick={handleClose} className="sorgu-button">
            İptal
          </Button>
          <Button onClick={handleSaveOrUpdate} className="sorgu-button">
            Kaydet
          </Button>
        </StyledEngineProvider>
      </DialogActions>
    </Dialog>
  );
};

export default UserFormDialog;
