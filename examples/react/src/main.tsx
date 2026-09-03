import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// The stylesheet is required — without it the clock renders at zero size.
import "@clock-ui/react/base.css";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
