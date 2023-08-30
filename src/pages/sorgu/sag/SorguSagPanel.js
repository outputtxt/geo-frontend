import { useState } from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import PanToolIcon from "@mui/icons-material/PanTool";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Leaflet from "./leaflet/Leaflet";
import ReactResizeDetector from 'react-resize-detector';
import domtoimage from "dom-to-image";
import { jsPDF } from "jspdf";

import MapController from "./leaflet/MapController";

import { useMap } from 'react-leaflet';
import "./SorguSagPanel.css";
import html2canvas from "html2canvas";

const SorguSagPanel = ({ sorguMenuOpen, setSorguMenuOpen }) => {
  const [open, setOpen] = useState(true);
  const [draggable, setDraggable] = useState(true);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const toggleSorguMenuOpen = () => {
    setSorguMenuOpen(!sorguMenuOpen);
  };

  const toggleDraggable = () => {
    setDraggable(!draggable);
  };

  const exportPDF = () => {
    console.log("EXPORT PDF CLİCKED");
    const input = document.getElementById("harita").children[0];

    html2canvas(input, {
      allowTaint: true,
      useCORS: true,
      onrendered: function(canvas) {
        document.body.appendChild(canvas);
      }
    }).then((canvas) => {
      const data = canvas.toDataURL('image/jpg');
      const link = document.createElement('a');
  
      if (typeof link.download === 'string') {
        link.href = data;
        link.download = 'image.jpg';
  
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.open(data);
      }
    });

    

    //MapController().zoomIn(5);

    // console.log(useMap())
    // console.log(useMap().toPng());
    
    // domtoimage.toPng(useMap(), { width, height }).then((dataUrl) => {
    //   domtoimage.toBlob(mapElement, { width, height }).then((blob) => {
    //     saveAs(blob, 'map.png');
    //   })
    // });

    // domtoimage.toPng(input)
    // .then(function (dataUrl) {
    //     var img = new Image();
    //     img.src = dataUrl;
    //     document.body.appendChild(img);
    // })
    // .catch(function (error) {
    //     console.error('oops, something went wrong!', error);
    // });

    //  html2canvas(document.getElementById("harita")).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   const pdf = new jsPDF({ orientation: "landscape" });
    //   pdf.addImage(imgData, "JPEG", 0, 0);
    //pdf.output("dataurlnewwindow");
    //    pdf.save("download.pdf");
    //  });

    // domtoimage.toPng(input).then((dataUrl) => {
    //   //Initialize JSPDF
    //   const doc = new jsPDF("p", "mm", "a4");
    //   //Add image Url to PDF
    //   doc.addImage(dataUrl, "PNG", 0, 0, 210, 340);
    //   doc.save("pdfDocument.pdf");
    // });
  };

  return (
    <div className="sorgu-sag-container">
      <div className="sorgu-sag-header">
        <button
          onClick={toggleSorguMenuOpen}
          title={"Sorgu Menü " + (sorguMenuOpen ? "Gizle" : "Göster")}
        >
          <MenuIcon />
        </button>
        <button
          onClick={toggleDraggable}
          title={draggable ? "" : "Sürükle"}
          className={draggable ? "select-button-on" : "select-button-off"}
        >
          <PanToolIcon />
        </button>
        <button
          onClick={exportPDF}
          title={"PDF Oluştur"}
          style={{ marginLeft: "10px" }}
        >
          <PictureAsPdfIcon style={{ color: "red" }} />
        </button>
      </div>
      <ReactResizeDetector handleWidth handleHeight>
        {({ height, width, targetRef }) => (
        <div className="sorgu-sag-map" id="harita" ref={targetRef}>
            <Leaflet height={height} width={width} draggable={draggable} /> 
        </div>
        )}
      </ReactResizeDetector>
      <div className="sorgu-sag-header" style={{ height: "30px" }}>
        <div className="sorgu-sag-header-left">Başlık 2</div>
        <div className="sorgu-sag-header-right">
          <button className="sorgu-sag-button-36" onClick={toggleOpen}>
            {open ? (
              <KeyboardDoubleArrowDownIcon />
            ) : (
              <KeyboardDoubleArrowUpIcon />
            )}
          </button>
        </div>
      </div>
      <div className={open ? "sorgu-sag-content" : "sorgu-sag-content-hidden"}>
        <h1>CONTENT</h1>
        ea of denouncing pleasure and praising pain was born and I will give you
        a complete account of the system, and expound the actual teachings of
        the great explorer of the truth, the master-builder of human happiness.
        No one rejects, dislikes, or avoids pleasure itself, because it is
        pleasure, but because those who do not know how to pursue pleasure
        rationally encounter consequences that are extremely painful. Nor again
        is there anyone who loves or pursues or desires to obtain pain of
        itself, because it is pain, but because occasionally circumstances occur
        in which toil and pain can procure him some great pleasure. To take a
        trivial example, which of us ever undertakes laborious physical
        exercise, except to obtain some advantage from it? But who has any right
        to find fault with a man who chooses to enjoy a pleasure that has no
        annoying consequences
      </div>
    </div>
  );
};

export default SorguSagPanel;
