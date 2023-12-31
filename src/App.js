import { useEffect, useState } from "react";
import MainPanel from "./view/MainPanel";
import Login from "./pages/Login";
import AuthService from "./service/auth.service";
import { SecureSessionStorage } from "./util/SecureSessionStorage";
import { authInfoStore } from "./util/CoreStore";
import "./App.css";
import "./variables.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSnapshot } from "valtio";

export default function App() {
  const { authenticated } = useSnapshot(authInfoStore);

  useEffect(() => {
    const user = SecureSessionStorage.getItem("user");

    if (user) {
      AuthService.setCurrentUser(user);
    }
  }, []);

  return <div className="App">{authenticated ? <MainPanel /> : <Login />}</div>;
}
