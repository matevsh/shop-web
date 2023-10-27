<template>
  <div class="p-8">
    <h1 class="font-bold text-4xl mb-12">Dodaj kategorie</h1>

    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <div>
        <UInput placeholder="Nazwa" v-bind="title" />
        <span v-if="isDirtyTitle">{{ errors.title }}</span>
      </div>

      <div>
        <UTextarea placeholder="Opis" v-bind="description" />
        <span v-if="isDirtyDescription">{{ errors.description }}</span>
      </div>

      <div class="relative">
        <UInput placeholder="Cena" v-bind="price" />
        <span class="absolute right-4 top-1 opacity-30 select-none">PLN</span>
        <span v-if="isDirtyPrice">{{ errors.price }}</span>
      </div>

      <USelectMenu v-bind="selected" :options="shops.shops">
        <template #label>
          <p
            :class="{
              'opacity-30': !values.selected?.name,
            }"
          >
            {{ values.selected?.name || "Wybierz sklep" }}
          </p>
        </template>
        <template #option="{ option }">
          <p>{{ option?.name }}</p>
        </template>
      </USelectMenu>

      <FileInput v-model="file" label="Dodaj zdjęcie produktu" />

      <UButton type="submit" class="max-w-[150px] mt-16">Dodaj</UButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { $fetch } from "ofetch";
import { useToast } from "#imports";
import { useProducts } from "~/common/stores/products";
import { apiPaths, url } from "~/common/constants/api-paths";
import { useShops } from "~/common/stores/shops";
import { shopSchema } from "~/common/stores/shops/models/get-shops";
import { toBase64 } from "~/common/utils/to-base64";

const toast = useToast();
const shops = useShops();

const { fetchProducts } = useProducts();
const validationSchema = toTypedSchema(
  z.object({
    title: z.string(),
    description: z.string(),
    price: z.coerce.number(),
    image: z.instanceof(File).optional(),
    selected: shopSchema,
  }),
);

const {
  handleSubmit,
  defineInputBinds,
  errors,
  isFieldDirty,
  values,
  setFieldValue,
} = useForm({
  validationSchema,
});

shops.cFetchShops();

const emit = defineEmits<{
  (event: "close"): void;
}>();

const title = defineInputBinds("title");
const price = defineInputBinds("price");
const selected = defineInputBinds("selected");
const description = defineInputBinds("description");

const file = computed({
  get() {
    return values.image as File | undefined;
  },
  set(value: File | undefined) {
    setFieldValue("image", value);
  },
});

const addProductResponse = z.object({
  httpStatus: z.number(),
  success: z.literal(true),
  message: z.string(),
});

const isDirtyTitle = isFieldDirty("title");
const isDirtyPrice = isFieldDirty("price");
const isDirtyDescription = isFieldDirty("description");

const onSubmit = handleSubmit(async ({ selected, image, ...values }) => {
  //     title: z.string(),
  //     description: z.string(),
  //     price: z.number().positive(),
  //     imageBase64: z.string().optional(),
  //     shopId: z.string(),

  try {
    const dataToSend: Record<string, string | number> = {
      ...values,
      shopId: selected.id,
    };

    const imageBase64 = image && (await toBase64(image));
    if (imageBase64) dataToSend.imageBase64 = imageBase64;

    const response = await $fetch(url(apiPaths.product.create), {
      credentials: "include",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
    addProductResponse.parse(response);
    emit("close");
    fetchProducts();
    toast.add({
      title: "Produkt został dodany",
      color: "green",
    });
  } catch (e) {
    console.log(e);
    toast.add({
      title: "Wystąpił nieoczekiwany błąd",
      color: "red",
    });
  }
});
</script>
