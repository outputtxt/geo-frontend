import { useEffect, useState } from "react";
import MainPanel from "./view/MainPanel";
import Login from "./pages/Login";
import AuthService from "./service/auth.service";
import "./App.css";
import "./variables.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return <div className="App">{currentUser ? <MainPanel /> : <Login />}</div>;
}
