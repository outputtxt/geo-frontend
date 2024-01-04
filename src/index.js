import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  ContentContextProvider,
  VisibilityContextProvider,
  MapContextProvider,
} from "./util/Context.js";
import CustomDialog from "./components/CustomDialog.js";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <MapContextProvider>
    <VisibilityContextProvider>
      <ContentContextProvider>
        <StrictMode>
          <BrowserRouter>
            <App />
            <CustomDialog />
          </BrowserRouter>
        </StrictMode>
      </ContentContextProvider>
    </VisibilityContextProvider>
  </MapContextProvider>,
);
