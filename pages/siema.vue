<template>
  <div>
    <div v-if="pending">Loading...</div>
    <div v-else>
      {{ JSON.stringify(data) }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFetch } from "#imports";

const { data, pending } = await useFetch("https://dummyjson.com/products");
</script>
