<template>
  <div class="aspect-square h-full">
    <img
      v-if="imageB64"
      :src="imageB64"
      alt="product image"
      class="w-full h-auto select-none"
    />
    <div v-else class="aspect-square h-full">
      <div
        class="bg-gray-800 flex items-center justify-center h-full aspect-square rounded-md"
      >
        <div
          class="w-[60px] h-[60px] bg-gray-900 aspect-square rounded-md flex items-center justify-center"
        >
          <UIcon
            name="i-mdi-image-remove-outline"
            class="text-gray-400 h-[40px] w-[40px]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  imageB64: string | null | undefined;
}>();
</script>
