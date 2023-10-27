<template>
  <USlideover v-model="isOpen">
    <div class="flex justify-between items-center p-8">
      <p class="font-semibold text-xl">Co chcesz dodać?</p>
      <USelectMenu
        v-model="selectedForm"
        :options="options"
        class="w-1/2"
        placeholder="Wybierz"
      />
    </div>
    <div class="flex justify-center items-center h-full">
      <div class="flex flex-col justify-center h-full w-[80%]">
        <Transition name="slide-up">
          <LazySidebarFormAddCategory
            v-if="selectedForm.value === SIDEBAR_FORM.CATEGORY.value"
            @close="isOpen = false"
          />
          <LazySidebarFormAddProduct
            v-else-if="selectedForm.value === SIDEBAR_FORM.PRODUCT.value"
            @close="isOpen = false"
          />
          <LazySidebarFormAddShop
            v-else-if="selectedForm.value === SIDEBAR_FORM.SHOP.value"
            @close="isOpen = false"
          />
        </Transition>
      </div>
    </div>
  </USlideover>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import {
  LazySidebarFormAddCategory,
  LazySidebarFormAddProduct,
  LazySidebarFormAddShop,
} from "#components";
import { SIDEBAR_FORM, useSidebar } from "~/common/stores/sidebar";

const sidebar = useSidebar();
const { isOpen, selectedForm } = storeToRefs(sidebar);

const options = Object.entries(SIDEBAR_FORM).map(([_, value]) => ({
  label: value.label,
  value: value.value,
}));
</script>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
