import { authInfoStore, visibilityStore } from "../util/CoreStore";
import { useSnapshot } from "valtio";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Box from "@mui/material/Box";

const Profile = () => {
  const { username, role } = useSnapshot(authInfoStore);

  const changePassword = () => {
    visibilityStore.openChangePasswordDialog = true;
  };

  return (
    <div className="container center-flex">
      <Box
        component="fieldset"
        className="sorgu-fieldset-min"
        style={{ minWidth: "500px" }}
      >
        <header className="jumbotron" style={{ marginTop: "100px" }}>
          <h1>
            <strong>{username}</strong>
          </h1>
          <h6>{"Rol: " + role.substring(5).replaceAll("_", " ")}</h6>
        </header>
        <p>
          <button
            className="logoutBtn"
            onClick={changePassword}
            title="Şifre Değiştir"
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "100px",
            }}
          >
            <ManageAccountsIcon
              fontSize="inherit"
              sx={{ color: "var(--background-color-2)" }}
            />
          </button>
        </p>
      </Box>
    </div>
  );
};

export default Profile;
