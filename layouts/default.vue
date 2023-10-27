<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useUser } from "~/common/stores/user";

const store = useUser();
const { fetchUser } = store;
await fetchUser();
</script>
