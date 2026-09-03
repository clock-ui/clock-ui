import { createApp } from "vue";
import App from "./App.vue";

// The stylesheet is required — without it the clock renders at zero size.
import "@clock-ui/vue/base.css";
import "./styles.css";

createApp(App).mount("#app");
