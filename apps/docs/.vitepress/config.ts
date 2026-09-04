import { defineConfig } from "vitepress";

const SITE = "https://clock-ui.github.io/clock-ui/";
const DESCRIPTION =
  "Accurate, customizable analog clock components for React, Vue, and vanilla JS. ~2.5 kB gzipped, zero dependencies.";
const OG_IMAGE = `${SITE}og-image.png`;

export default defineConfig({
  title: "Clock UI",
  description: DESCRIPTION,
  lang: "en-US",
  base: "/clock-ui/",
  lastUpdated: true,

  sitemap: {
    hostname: SITE,
  },

  head: [
    ["link", { rel: "icon", href: "/clock-ui/favicon.ico" }],

    ["meta", { name: "theme-color", content: "#13293D" }],

    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: "Clock UI" }],
    ["meta", { property: "og:title", content: "Clock UI" }],
    ["meta", { property: "og:description", content: DESCRIPTION }],
    ["meta", { property: "og:url", content: SITE }],
    ["meta", { property: "og:image", content: OG_IMAGE }],
    ["meta", { property: "og:image:width", content: "1200" }],
    ["meta", { property: "og:image:height", content: "630" }],

    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:title", content: "Clock UI" }],
    ["meta", { name: "twitter:description", content: DESCRIPTION }],
    ["meta", { name: "twitter:image", content: OG_IMAGE }],

    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Noto+Serif+Display:wght@400;500;600;700&display=swap",
        rel: "stylesheet",
      },
    ],
    ["link", { rel: "preconnect", href: "https://fonts.bunny.net" }],
    [
      "link",
      {
        href: "https://fonts.bunny.net/css?family=aboreto:400|abril-fatface:400|cinzel-decorative:400|poppins:400",
        rel: "stylesheet",
      },
    ],
  ],

  themeConfig: {
    logo: "/logo.svg",
    search: {
      provider: "local",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/docs/getting-started" },
      { text: "Playground", link: "/docs/playground" },
    ],

    sidebar: {
      "/docs/": [
        {
          text: "Guide",
          items: [
            { text: "Getting Started", link: "/docs/getting-started" },
            { text: "Playground", link: "/docs/playground" },
            { text: "Accessibility", link: "/docs/accessibility" },
            { text: "Server-side rendering", link: "/docs/ssr" },
          ],
        },
        {
          text: "Libraries",
          items: [
            { text: "DOM", link: "/docs/dom" },
            { text: "React", link: "/docs/react" },
            { text: "Vue", link: "/docs/vue" },
            { text: "Web Component", link: "/docs/web-component" },
          ],
        },
        {
          text: "Customization",
          items: [
            { text: "Anatomy & HTML Structure", link: "/docs/anatomy" },
            { text: "CSS Customization", link: "/docs/styling" },
          ],
        },
        {
          text: "Examples",
          items: [{ text: "Examples & Recipes", link: "/docs/examples" }],
        },
      ],
    },

    outline: {
      level: [2, 4],
      label: "On this page",
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/clock-ui/clock-ui" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025-present Clock UI",
    },
  },
});
