<template>
  <NuxtLayout>
    <RouterView />
  </NuxtLayout>

  <UNotifications />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";

useHead({
  title: "MefiShop",
  htmlAttrs: { lang: "pl-PL" },
  meta: [
    {
      name: "description",
      content: "My amazing site",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, maximum-scale=1",
    },
    {
      charset: "utf-8",
    },
  ],
  link: [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    { rel: "manifest", href: "/site.webmanifest" },
  ],
});
</script>
