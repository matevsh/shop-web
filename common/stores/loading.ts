import { defineStore } from "pinia";

export const useLoading = defineStore("loading", () => {
  const loading = ref(false);

  const startLoading = () => {
    loading.value = true;
  };

  const stopLoading = () => {
    loading.value = false;
  };

  return { loading, startLoading, stopLoading };
});
