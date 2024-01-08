import "../App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import Sidebar from "./sidebar/Sidebar";
import Home from "../pages/Home";
import AdminPanel from "../pages/AdminPanel";
import SorguPanel from "../pages/sorgu/SorguPanel";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import UserChangePasswordDialog from "../pages/user/UserChangePasswordDialog";
import { authInfoStore, visibilityStore } from "../util/CoreStore";
import { isAdmin } from "../model/enum/RoleTipi";

const MainPanel = () => {
  const { role } = useSnapshot(authInfoStore);
  const { sideBarVisible } = useSnapshot(visibilityStore);
  const sorguPanel = <SorguPanel />;

  useEffect(() => {
    visibilityStore.sideBarVisible = isAdmin(role);
  }, []);

  return (
    <div className="App">
      {sideBarVisible ? <Sidebar /> : null}

      <div className="full-page">
        <Routes>
          <Route path="/" element={sorguPanel} />
          <Route path="/sorgu" element={sorguPanel} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>

      <UserChangePasswordDialog />
    </div>
  );
};

export default MainPanel;
