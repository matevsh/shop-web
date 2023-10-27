// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@pinia/nuxt", "@nuxt/ui"],
  ui: {
    icons: ["mdi"],
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
});
