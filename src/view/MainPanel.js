import "../App.css";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Sidebar from "./sidebar/Sidebar";
import Home from "../pages/Home";
import AdminPanel from "../pages/AdminPanel";
import SorguPanel from "../pages/sorgu/SorguPanel";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import { VisibilityContext } from "../util/Context.js";

const MainPanel = () => {
  const { sideBarVisible } = useContext(VisibilityContext);

  return (
    <div className="App">
      {sideBarVisible ? <Sidebar /> : null}

      <div className="full-page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/profile" element={<Profile />} />
          {/*<Route path="/admin" element={<CollapsePanel />} /> */}
          <Route path="/Sorgu" element={<SorguPanel />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainPanel;
