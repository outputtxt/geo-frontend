import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  SideBarContextProvider,
  MapContextProvider,
} from "./util/context/Context.js";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <SideBarContextProvider>
    <MapContextProvider>
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    </MapContextProvider>
  </SideBarContextProvider>
);
