import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { sidebarData } from "./sidebarData";
import styles from "./sidebar.module.css";
import { SideBarContext } from "../../util/context/Context.js";

const Sidebar = () => {
  const { open, setOpen } = useContext(SideBarContext);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={open ? styles.sidenav : styles.sidenavClosed}>
      <button className={styles.menuBtn} onClick={toggleOpen}>
        {open ? (
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
