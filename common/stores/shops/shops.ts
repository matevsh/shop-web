import { defineStore } from "pinia";
import {
  getShopsResponse,
  GetShopsResponse,
} from "~/common/stores/shops/models/get-shops";
import { apiPaths, url } from "~/common/constants/api-paths";

export const useShops = defineStore("shops", () => {
  const shops = ref<GetShopsResponse[]>([]);
  const isLoading = ref(false);
  const toast = useToast();

  async function fetchShops() {
    isLoading.value = true;

    try {
      const response = await $fetch(url(apiPaths.shop._exact), {
        method: "get",
      });
      const data = getShopsResponse.parse(response);
      if (!data.success) {
        toast.add({
          title: data.message,
          color: "red",
        });
        return;
      }

      shops.value = data.data;
    } catch (e) {
      toast.add({
        title: "Unexpected server error",
        color: "red",
      });
    } finally {
      isLoading.value = false;
    }
  }

  function cFetchShops() {
    if (shops.value.length) return;
    void fetchShops();
  }

  return { shops, fetchShops, cFetchShops, isLoading };
});
