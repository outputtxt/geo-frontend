import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { useContext } from "react";
import { VisibilityContext } from "../util/Context.js";

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
    alert("this is:" + secureLocalStorage.getItem("number"));
    setSideBarVisible(!sideBarVisible);
  }

  function ToggleSideBar() {
    alert(sideBarOpen);
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
