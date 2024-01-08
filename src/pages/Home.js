import {
  showConfirm,
  showInfo,
  showWarning,
  showError,
} from "../components/CustomDialog.js";
import { visibilityStore } from "../util/CoreStore.js";

const Home = () => {
  function HandleClick() {
    showError("bilgi mesajı yayınlama");
    // showConfirm("Test", "red pill or blue pill ?")
    //   .then(() => {
    //     console.log("accepted");
    //   })
    //   .catch(() => {
    //     console.log("rejected");
    //   });
    visibilityStore.sideBarVisible = !visibilityStore.sideBarVisible;
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
