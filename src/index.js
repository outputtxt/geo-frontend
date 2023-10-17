import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  SideBarContextProvider,
  MapContextProvider,
} from "./util/context/Context.js";

import App from "./App";

// let appReady = Promise.resolve();

// // Enable API mocking only in development
// if (process.env.NODE_ENV === "development") {
//   const { worker } = require("./service/rest/mocks/browser");
//   appReady = worker.start({
//     serviceWorker: {
//       /**
//        * Use a custom Service Worker script URL to resolve
//        * the mock worker served by Codesandbox.
//        * @note You DO NOT need this in your application.
//        * @see https://mswjs.io/docs/api/setup-worker/start#serviceworker
//        */
//       url: "/mockServiceWorker.js",
//     },
//   });
// }

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// appReady.then(() => {
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
// });
