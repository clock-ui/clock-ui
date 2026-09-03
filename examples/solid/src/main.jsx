import { render } from "solid-js/web";
import App from "./App";

// Registers <clock-ui>. Solid compiles unknown tags to real DOM elements, so
// no configuration is needed.
import "@clock-ui/dom/element";
import "@clock-ui/dom/base.css";
import "./styles.css";

render(() => <App />, document.getElementById("root"));
