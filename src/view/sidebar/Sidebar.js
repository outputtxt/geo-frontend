import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { sidebarData } from "./sidebarData";
import styles from "./sidebar.module.css";
import { VisibilityContext } from "../../util/context/Context.js";

const Sidebar = () => {
  const { sideBarOpen, setSideBarOpen } = useContext(VisibilityContext);

  const toggleOpen = () => {
    setSideBarOpen(!sideBarOpen);
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
            <span className={open ? styles.linkText : styles.linkTextClosed}>
              {item.text}
            </span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Sidebar;
