import "../App.css";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Sidebar from "./sidebar/Sidebar";
import Home from "../pages/Home";
import AdminPanel from "../pages/AdminPanel";
import SorguPanel from "../pages/sorgu/SorguPanel";
import CollapsePanel from "../pages/CollapsePanel";
import { SideBarContext } from "../util/context/Context.js";

const MainPanel = () => {
  const { visible } = useContext(SideBarContext);

  return (
    <div className="App">
      {visible ? <Sidebar /> : null}

      <div className="full-page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPanel />} />
          {/*<Route path="/admin" element={<CollapsePanel />} /> */}
          <Route path="/Sorgu" element={<SorguPanel />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainPanel;
