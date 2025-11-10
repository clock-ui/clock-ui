import DefaultTheme from "vitepress/theme";
import { LiveClock, BaseClock } from "@clock-ui/vue";
import "@clock-ui/vue/base.css";
import "./custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("LiveClock", LiveClock);
    app.component("BaseClock", BaseClock);
  },
};
