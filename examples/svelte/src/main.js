import { mount } from "svelte";
import App from "./App.svelte";

// Registers <clock-ui>. Nothing else is needed — Svelte passes unknown tags
// straight through to the DOM.
import "@clock-ui/dom/element";
import "@clock-ui/dom/base.css";
import "./styles.css";

mount(App, { target: document.getElementById("app") });
