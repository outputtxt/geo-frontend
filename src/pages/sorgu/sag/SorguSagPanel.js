import { useState, useEffect, useContext } from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuIcon from "@mui/icons-material/Menu";
import PanToolIcon from "@mui/icons-material/PanTool";
import RefreshIcon from "@mui/icons-material/Refresh";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import StraightenIcon from "@mui/icons-material/Straighten";
import useMapToolbarService from "../../../service/MapToolbarService";
import AuthService from "../../../service/auth.service";
import Leaflet from "./leaflet/Leaflet";
import ReactResizeDetector from "react-resize-detector";
import { formatLatitude, formatLongitude } from "../../../util/Helper";
import { ContentContext } from "../../../util/Context";
import { showConfirm } from "../../../components/CustomDialog";
import "./SorguSagPanel.css";
import html2canvas from "html2canvas";

const SorguSagPanel = ({ sorguMenuOpen, setSorguMenuOpen }) => {
  const mapToolbarService = useMapToolbarService();

  const { contentHeader, contentOpen, contentData } =
    useContext(ContentContext);

  const [open, setOpen] = useState(true);
  const [draggable, setDraggable] = useState(true);
  const [mousePoint, setMousePoint] = useState(null);

  const formattedCoordinates =
    mousePoint === null
      ? ""
      : `${formatLatitude(mousePoint.lat)}, ${formatLongitude(mousePoint.lng)}`;

  // enable to copy current mouse coordinate with CTRL + C
  useEffect(
    function copyToClipboard() {
      function handleCtrlCKeydown(event) {
        if (
          event.key === "c" &&
          event.ctrlKey &&
          formattedCoordinates.length > 0 &&
          navigator.clipboard
        ) {
          navigator.clipboard.writeText(formattedCoordinates);
        }
      }

      document.addEventListener("keydown", handleCtrlCKeydown);

      return function cleanup() {
        document.removeEventListener("keydown", handleCtrlCKeydown);
      };
    },
    [formattedCoordinates],
  );

  const toggleOpen = () => {
    setOpen(!open);
  };

  const toggleSorguMenuOpen = () => {
    setSorguMenuOpen(!sorguMenuOpen);
  };

  const onResetMapClick = () => {
    showConfirm("Haritayı temizlemek istediğinizden emin misiniz?")
      .then(() => {
        mapToolbarService.resetMap();
      })
      .catch(() => {});
  };

  const toggleDraggable = () => {
    setDraggable(!draggable);
    mapToolbarService.changeDraggable(!draggable);
  };

  const exportPDF = () => {
    console.log("EXPORT PDF CLİCKED");
    const input = document.getElementById("harita").children[0];

    html2canvas(input, {
      allowTaint: true,
      useCORS: true,
      onrendered: function (canvas) {
        document.body.appendChild(canvas);
      },
    }).then((canvas) => {
      const data = canvas.toDataURL("image/jpg");
      const link = document.createElement("a");

      if (typeof link.download === "string") {
        link.href = data;
        link.download = "image.jpg";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.open(data);
      }
    });
  };

  const logout = () => {
    showConfirm("Uygulamadan Çıkmak İstediğinize Emin misiniz?")
      .then(() => {
        AuthService.logout();
      })
      .catch(() => {});
  };

  const changePassword = () => {
    console.log("Change Password Clicked");
  };

  return (
    <div className="sorgu-sag-container">
      <div className="sorgu-sag-header">
        <button
          className="toolbar-button"
          // style={{ marginLeft: "1px" }}
          onClick={toggleSorguMenuOpen}
          title={"Sorgu Menü " + (sorguMenuOpen ? "Gizle" : "Göster")}
        >
          <MenuIcon />
        </button>
        <button
          onClick={onResetMapClick}
          title={"Haritayı Temizle"}
          style={{ color: "DodgerBlue" }}
          className="toolbar-button"
        >
          <RefreshIcon />
        </button>
        {/* <button
          onClick={toggleDraggable}
          title={draggable ? "" : "Sürükle"}
          className={draggable ? "select-button-on" : "select-button-off"}
        >
          <PanToolIcon style={{ paddingTop: "3px", paddingBottom: "1px" }} />
        </button> */}
        {/* <button
          title="Mesafe Ölçümü Yap"
          className="toolbar-button"
          style={{ paddingTop: "5px" }}
        >
          <StraightenIcon />
        </button> */}
        {/* <button
          onClick={exportPDF}
          title={"PDF Oluştur"}
          className="toolbar-button"
        >
          <PictureAsPdfIcon style={{ color: "red" }} />
        </button> */}

        <label style={{ marginLeft: "auto" }}> {formattedCoordinates} </label>

        <button
          className="logoutBtn"
          onClick={changePassword}
          title="Şifre Değiştir"
          style={{
            marginLeft: "20px",
            background: "transparent",
            border: "none",
            color: "white",
          }}
        >
          <ManageAccountsIcon />
        </button>

        <button
          className="logoutBtn"
          onClick={logout}
          title="Çıkış"
          style={{
            // marginLeft: "5px",
            background: "transparent",
            border: "none",
            color: "white",
          }}
        >
          <LogoutIcon />
        </button>
      </div>
      <ReactResizeDetector handleWidth handleHeight>
        {({ height, width, targetRef }) => (
          <div className="sorgu-sag-map" id="harita" ref={targetRef}>
            <Leaflet
              height={height}
              width={width}
              setMousePoint={setMousePoint}
            />
          </div>
        )}
      </ReactResizeDetector>
      <div style={{ display: contentOpen ? "" : "none", width: "100%" }}>
        <div className="sorgu-sag-content-header">
          <div>{contentHeader}</div>
          <div style={{ marginLeft: "auto" }}>
            <button className="sorgu-sag-button-36" onClick={toggleOpen}>
              {open ? (
                <KeyboardDoubleArrowDownIcon />
              ) : (
                <KeyboardDoubleArrowUpIcon />
              )}
            </button>
          </div>
        </div>
        <div
          style={{
            display: open ? "" : "none",
            maxHeight: "300px",
            overflow: "auto",
          }}
        >
          {contentData}
          {/* <h1>CONTENT</h1>
          ea of denouncing pleasure and praising pain was born and I will give
          you a complete account of the system, and expound the actual teachings
          of the great explorer of the truth, the master-builder of human
          happiness. No one rejects, dislikes, or avoids pleasure itself,
          because it is pleasure, but because those who do not know how to
          pursue pleasure rationally encounter consequences that are extremely
          painful. Nor again is there anyone who loves or pursues or desires to
          obtain pain of itself, because it is pain, but because occasionally
          circumstances occur in which toil and pain can procure him some great
          pleasure. To take a trivial example, which of us ever undertakes
          laborious physical exercise, except to obtain some advantage from it?
          But who has any right to find fault with a man who chooses to enjoy a
          pleasure that has no annoying consequences */}
        </div>
      </div>
    </div>
  );
};

export default SorguSagPanel;
