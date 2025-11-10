import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Clock UI",
  useWebFonts: true,
  base: "/clock-ui/",

  description: "A clock component library for DOM, React, and Vue",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
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
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/docs/getting-started" },
    ],

    sidebar: {
      "/docs/": [
        {
          text: "Guide",
          items: [{ text: "Getting Started", link: "/docs/getting-started" }],
        },
        {
          text: "Libraries",
          items: [
            { text: "DOM", link: "/docs/dom" },
            { text: "React", link: "/docs/react" },
            { text: "Vue", link: "/docs/vue" },
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
  },

  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
});
