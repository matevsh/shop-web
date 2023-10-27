<template>
  <div class="h-full overflow-hidden flex justify-center pt-8">
    <div v-if="pending">Loading...</div>
    <div v-else class="h-full w-[70%] flex">
      <div class="basis-1/2 grow aspect-square">
        <ImageB64 :image-b64="data?.imageBase64" />
      </div>
      <div class="basis-1/2 grow p-8">
        <h1 class="text-2xl font-bold">{{ data?.title }}</h1>
        <p>{{ data?.description }}</p>

        <div class="pt-16">
          <h2 class="text-xl font-semibold">Sklep</h2>
          <p>Przedmiot ze sklepu: {{ data?.shop.name }}</p>
          <p>
            przedmiot dodany
            <span class="font-semibold">{{
              dayjs(data?.shop.createdAt).format("DD _ MM _ YYYY")
            }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { z } from "zod";
import dayjs from "dayjs";
import { apiPaths, url } from "~/common/constants/api-paths";
import { zResponse } from "~/common/models/response";

const route = useRoute();

const product = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  imageBase64: z.string().nullable(),
  createdAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
  shopId: z.string(),
  shop: z.object({
    id: z.string(),
    name: z.string(),
    imageBase64: z.string().nullable(),
    createdAt: z.coerce.date(),
    deletedAt: z.coerce.date().nullable(),
    userId: z.string(),
  }),
});

const responseProduct = zResponse(z.object({ product }));

type Product = z.infer<typeof product>;
const data = ref<Product>();

const { pending } = await useAsyncData(
  `product-${route.params.id}`,
  async () => {
    const response = await $fetch(
      url(apiPaths.product._productId(`${route.params.id}`)),
    );
    const product = responseProduct.parse(response);
    console.log(product);

    if (product.success) {
      data.value = product.data.product;
    }
  },
);
</script>
