import "../App.css";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Sidebar from "./sidebar/Sidebar";
import Home from "../pages/Home";
import AdminPanel from "../pages/AdminPanel";
import SorguPanel from "../pages/sorgu/SorguPanel";
import { VisibilityContext } from "../util/Context.js";

const MainPanel = () => {
  const { sideBarVisible } = useContext(VisibilityContext);

  return (
    <div className="App">
      {sideBarVisible ? <Sidebar /> : null}

      <div className="full-page">
        <Routes>
          <Route path="/" element={<SorguPanel />} />
          <Route path="/admin" element={<AdminPanel />} />
          {/*<Route path="/admin" element={<CollapsePanel />} /> */}
          <Route path="/Sorgu" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainPanel;
