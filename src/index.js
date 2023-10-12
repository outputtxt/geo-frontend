import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  SideBarContextProvider,
  MapContextProvider,
} from "./util/context/Context.js";

import App from "./App";

//if (process.env.NODE_ENV === "development") {
const { worker } = require("./service/rest/mocks/browser");
worker.start({
  // useful in the scenario that your application runs behind a proxy, or has a dynamic hostname.
  findWorker: (scriptURL, _mockServiceWorkerUrl) =>
    scriptURL.includes("mockServiceWorker"),
});
//}

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
  </SideBarContextProvider>,
);
