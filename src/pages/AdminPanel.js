import { useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Button from "@mui/material/Button";
import { StyledEngineProvider } from "@mui/material/styles";
import UserFormDialog from "./user/UserFormDialog";
import User from "../model/User";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(null);

  const refresh = () => {
    console.log("refresh user list");
  };

  const newUserClick = () => {
    setUser(null);
    setOpenDialog(true);
    console.log("new user click");
  };

  const updateUserClick = () => {
    const user = new User({
      username: "kullanici",
      active: false,
      role: "roleOnleyiciAdmin",
    });
    setUser(user);
    setOpenDialog(true);
    console.log("new user click");
  };

  return (
    <div className="admin-panel">
      <div>
        <StyledEngineProvider injectFirst>
          <Button
            onClick={updateUserClick}
            // onClick={refresh}
            variant="contained"
            startIcon={<RefreshIcon />}
            className="sorgu-button"
          >
            Yenile
          </Button>
          <Button
            onClick={newUserClick}
            variant="contained"
            startIcon={<PersonAddIcon />}
            className="sorgu-button"
            style={{ marginLeft: "15px" }}
          >
            Yeni Kullanıcı
          </Button>
        </StyledEngineProvider>
      </div>
      ea of denouncing pleasure and praising pain was born and I will give you a
      complete account of the system, and expound the actual teachings of the
      great explorer of the truth, the master-builder of human happiness. No one
      rejects, dislikes, or avoids pleasure itself, because it is pleasure, but
      because those who do not know how to pursue pleasure rationally encounter
      consequences that are extremely painful. Nor again is there anyone who
      loves or pursues or desires to obtain pain of itself, because it is pain,
      but because occasionally circumstances occur in which toil and pain can
      procure him some great pleasure. To take a trivial example, which of us
      ever undertakes laborious physical exercise, except to obtain some
      advantage from it? But who has any right to find fault with a man who
      chooses to enjoy a pleasure that has no annoying consequences
      {openDialog && (
        <UserFormDialog
          title="Baslik"
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          user={user}
        />
      )}
    </div>
  );
};

export default AdminPanel;
