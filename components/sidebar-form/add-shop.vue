<template>
  <div class="p-8">
    <h1 class="font-bold text-4xl mb-12">Dodaj sklep</h1>

    <!--        <Loader v-if="isLoading"/>-->

    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <div>
        <UInput placeholder="Nazwa" v-bind="name" />
        <span>{{ errors.name }}</span>
      </div>

      <!--        <USelectMenu v-model="selected" :options="people" multiple placeholder="Select people" />-->

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
import { apiPaths, url } from "~/common/constants/api-paths";
import { useShops } from "~/common/stores/shops";

const toast = useToast();
const shops = useShops();

const validationSchema = toTypedSchema(
  z.object({
    name: z.string(),
  }),
);

const { handleSubmit, defineInputBinds, errors } = useForm({
  validationSchema,
});

const name = defineInputBinds("name");

const emit = defineEmits<{
  (event: "close"): void;
}>();

const addProductResponse = z.object({
  httpStatus: z.number(),
  success: z.literal(true),
  message: z.string(),
});

const onSubmit = handleSubmit(async (values) => {
  console.log("test");
  try {
    const response = await $fetch(url(apiPaths.shop.create), {
      credentials: "include",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    addProductResponse.parse(response);
    emit("close");
    toast.add({
      title: "Sklep został dodany",
      color: "green",
    });
    await shops.fetchShops();
  } catch (e) {
    console.log(e);
    toast.add({
      title: "Wystąpił nieoczekiwany błąd",
      color: "red",
    });
  }
});
</script>
