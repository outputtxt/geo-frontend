import { authInfoStore, visibilityStore } from "../util/CoreStore";
import { useSnapshot } from "valtio";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const Profile = () => {
  const { username, role } = useSnapshot(authInfoStore);

  const changePassword = () => {
    visibilityStore.openChangePasswordDialog = true;
  };

  return (
    <div className="container">
      <header className="jumbotron" style={{ marginTop: "100px" }}>
        <h1>
          <strong>{username}</strong>
        </h1>
        <h6>{role}</h6>
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
          <ManageAccountsIcon fontSize="inherit" />
        </button>
      </p>
    </div>
  );
};

export default Profile;
