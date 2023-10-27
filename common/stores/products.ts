import { defineStore } from "pinia";
import { z } from "zod";
import { useToast } from "#imports";
import { apiPaths, url } from "~/common/constants/api-paths";

const productsResponseSchema = z.object({
  httpStatus: z.number(),
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    products: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        price: z.number(),
        imageBase64: z.string().nullable(),
        createdAt: z.coerce.date(),
        deletedAt: z.coerce.date(),
        shopId: z.string(),
      }),
    ),
  }),
});

type ProductResponse = z.infer<typeof productsResponseSchema>;
type Product = ProductResponse["data"]["products"][number];

export const useProducts = defineStore("products", () => {
  const products = ref<Product[]>([]);
  const loading = ref(false);

  const toast = useToast();

  const fetchProducts = () => {
    loading.value = true;
    return useAsyncData("products", async () => {
      try {
        const response = await $fetch(url(apiPaths.product._exact), {
          method: "get",
          credentials: "include",
        });
        const data = productsResponseSchema.parse(response);
        products.value = data.data.products;
      } catch {
        toast.add({ title: "unexpected error" });
      } finally {
        loading.value = false;
      }
    });
  };

  return { products, loading, fetchProducts };
});
