import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

const MainPanel = () => {
  useEffect(() => {
    secureLocalStorage.setItem("object", {
      message: "This is testing of local storage"
    });
    secureLocalStorage.setItem("number", 12);
    secureLocalStorage.setItem("string", "12");
    secureLocalStorage.setItem("boolean", true);
    let value = secureLocalStorage.getItem("boolean");
  }, []);

  function handleClick() {
    alert("this is:" + secureLocalStorage.getItem("number"));
  }

  return (
    <div>
      <button onClick={handleClick}>Show Secure Storage</button>
    </div>
  );
};

export default MainPanel;
