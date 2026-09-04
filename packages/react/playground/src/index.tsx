import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "@clock-ui/styles/src/clock-ui.css";
import "./style.css";

createRoot(document.querySelector("#app")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
