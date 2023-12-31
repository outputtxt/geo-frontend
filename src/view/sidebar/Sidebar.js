import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { sidebarData } from "./sidebarData";
import { VisibilityContext } from "../../util/Context.js";
import AuthService from "../../service/auth.service";
import { useConfirm } from "../../components/confirm/ConfirmService.js";
import styles from "./sidebar.module.css";

const Sidebar = () => {

  const confirm = useConfirm();
  const { sideBarOpen, setSideBarOpen } = useContext(VisibilityContext);
  
  const toggleOpen = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const logout = () => {
    console.log("LOGOUT sidebarjs");

    confirm({
      title: "",
      text: "Uygulamadan Çıkmak İstediğinize Emin misiniz?"
    })
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
