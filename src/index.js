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
  // onUnhandledRequest: "bypass",
  // turn off MSW warnings for specific routes
  // onUnhandledRequest(req, print) {
  // specify routes to exclude
  //   const excludedRoutes = ["/favicon.ico", "/manifest.json", "google"];

  //   // check if the req.url.pathname contains excludedRoutes
  //   const isExcluded = excludedRoutes.some((route) =>
  //     req.url.pathname.includes(route),
  //   );

  //   if (isExcluded) {
  //     return;
  //   }

  //   print.warning();
  // },

  // useful in the scenario that your application runs behind a proxy, or has a dynamic hostname.
  findWorker: (scriptURL, _mockServiceWorkerUrl) =>
    scriptURL.includes("mockServiceWorker"),

  // serviceWorker: {
  //   url: "${window.location.origin}/mockServiceWorker.js",
  // },
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
