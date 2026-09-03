import DefaultTheme from "vitepress/theme";
import { LiveClock, BaseClock } from "@clock-ui/vue";
import "@clock-ui/vue/base.css";
import "./custom.css";
import ClockPlayground from "../../components/ClockPlayground.vue";
import WithinHero from "../../components/WithinHero.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("LiveClock", LiveClock);
    app.component("BaseClock", BaseClock);
    app.component("ClockPlayground", ClockPlayground);
    app.component("WithinHero", WithinHero);
  },
};
