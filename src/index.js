import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MapContextProvider } from "./util/Context.js";
import CustomDialog from "./components/CustomDialog.js";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <MapContextProvider>
    <StrictMode>
      <BrowserRouter>
        <App />
        <CustomDialog />
      </BrowserRouter>
    </StrictMode>
  </MapContextProvider>,
);
