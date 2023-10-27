<template>
  <div class="flex justify-center pt-16">
    <div class="w-4/5 flex gap-2">
      <div
        v-for="product in productsStore.products"
        :key="product.id"
        class="basis-1/4 shrink p-4 bg-gray-900 rounded-md ring-1 ring-gray-800"
      >
        <div class="flex flex-col gap-2 justify-between h-full">
          <div
            class="h-full overflow-hidden rounded-md basis-4/5 flex items-center justify-center bg-gray-800"
          >
            <ImageB64 :image-b64="product.imageBase64" />
          </div>
          <router-link
            :to="{ path: `/product/${product.id}` }"
            class="truncate"
            >{{ product.title }}</router-link
          >
          <p class="font-semibold truncate">{{ product.price }}zł</p>
          <div class="flex justify-end">
            <UButton>Dodaj do koszyka</UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProducts } from "~/common/stores/products";
import ImageB64 from "~/components/imageB64.vue";

const productsStore = useProducts();
await productsStore.fetchProducts();
</script>
