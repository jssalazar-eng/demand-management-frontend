import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DOM_ELEMENTS } from "./constants/navigation";
import { BROWSER_CAPABILITIES } from "./constants/serviceWorker";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { serviceWorkerManager } from "./utils/serviceWorkerManager";

const root = ReactDOM.createRoot(
  document.getElementById(DOM_ELEMENTS.ROOT) as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registrar Service Worker para funcionalidad offline
if (BROWSER_CAPABILITIES.SERVICE_WORKER in navigator) {
  serviceWorkerManager
    .register()
    .then(() => {
      console.log("Service Worker registrado exitosamente");
    })
    .catch((error: Error) => {
      console.error("Error al registrar Service Worker:", error);
    });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
