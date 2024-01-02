import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { useContext } from "react";
import { VisibilityContext } from "../util/Context.js";
import AuthService from "../service/auth.service";
import { showAlert } from "../components/alert/AlertDialog.js";

const Home = () => {
  const { sideBarVisible, setSideBarVisible, sideBarOpen } =
    useContext(VisibilityContext);

  useEffect(() => {
    secureLocalStorage.setItem("object", {
      message: "This is testing of local storage",
    });
    secureLocalStorage.setItem("number", 12);
    secureLocalStorage.setItem("string", "12");
    secureLocalStorage.setItem("boolean", true);
    let value = secureLocalStorage.getItem("boolean");
  }, []);

  function HandleClick() {
    showAlert("Deneme Alert", "bakalım çalışacak mı", "error");
    setSideBarVisible(!sideBarVisible);
  }

  function ToggleSideBar() {
    showAlert("Deneme Alert", "bakalım çalışacak mı", "info");
    alert(sideBarOpen);
    // AuthService.logout();
  }

  return (
    <div>
      <h2>HOME</h2>
      <button onClick={HandleClick}>Show Secure Storage</button>
      <br />
      <br />
      <button onClick={ToggleSideBar}>Alert Side Bar</button>
    </div>
  );
};

export default Home;
