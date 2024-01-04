import { useContext } from "react";
import { VisibilityContext } from "../util/Context.js";
import {
  showConfirm,
  showInfo,
  showWarning,
  showError,
} from "../components/CustomDialog.js";

const Home = () => {
  const { sideBarVisible, setSideBarVisible, sideBarOpen } =
    useContext(VisibilityContext);

  function HandleClick() {
    showError("bilgi mesajı yayınlama");
    // showConfirm("Test", "red pill or blue pill ?")
    //   .then(() => {
    //     console.log("accepted");
    //   })
    //   .catch(() => {
    //     console.log("rejected");
    //   });
    setSideBarVisible(!sideBarVisible);
  }

  function ToggleSideBar() {
    showError("Deneme Başlık", "bakalım çalışacak mı");
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
