import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import { sidebarData } from "./sidebarData";
import AuthService from "../../service/auth.service";
import { showConfirm } from "../../components/CustomDialog";
import { useSnapshot } from "valtio";
import { visibilityStore } from "../../util/CoreStore";
import styles from "./sidebar.module.css";

const Sidebar = () => {
  const { sideBarOpen } = useSnapshot(visibilityStore);

  const toggleOpen = () => {
    visibilityStore.sideBarOpen = !visibilityStore.sideBarOpen;
  };

  const logout = () => {
    console.log("LOGOUT sidebarjs");

    showConfirm("Uygulamadan Çıkmak İstediğinize Emin misiniz?")
      .then(() => {
        AuthService.logout();
      })
      .catch(() => {});
  };

  return (
    <div className={sideBarOpen ? styles.sidenav : styles.sidenavClosed}>
      <button className={styles.menuBtn} onClick={toggleOpen}>
        {sideBarOpen ? (
          <KeyboardDoubleArrowLeftIcon />
        ) : (
          <KeyboardDoubleArrowRightIcon />
        )}
      </button>

      {sidebarData.map((item) => {
        return (
          <NavLink key={item.id} className={styles.sideitem} to={item.link}>
            {item.icon}
            <span
              className={sideBarOpen ? styles.linkText : styles.linkTextClosed}
            >
              {item.text}
            </span>
          </NavLink>
        );
      })}

      <button className={styles.logoutBtn} onClick={logout} title="Çıkış">
        <LogoutIcon />{" "}
        <span className={sideBarOpen ? styles.linkText : styles.linkTextClosed}>
          Çıkış
        </span>
      </button>
    </div>
  );
};

export default Sidebar;
