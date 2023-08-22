import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import "./App.css";
import Sidenav from "./components/Sidenav";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import { SideBarContext } from "./context/Context.js";

export default function App() {
  const { visible } = useContext(SideBarContext);

  return (
    <div className="App">
      {visible ? <Sidenav /> : null}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </main>
    </div>
  );
}
