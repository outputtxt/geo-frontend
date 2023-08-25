import { useEffect } from "react";

const HaritaPanel = ({ fullScreen, selectedSorgu }) => {
  useEffect(() => {
    if (fullScreen) console.log("full screen");
  }, [fullScreen]);

  return (
    <div className={fullScreen ? "container" : "container"}>
      CONTENT {selectedSorgu}
    </div>
  );
};

export default HaritaPanel;
