<template>
  <div class="grow flex justify-center items-center">
    <UCard>
      <h1 v-if="!keyString" class="font-semibold text-2xl mb-4 text-center">
        Rejestracja
      </h1>
      <div v-if="keyString">
        <div class="text-xl">
          Twój klucz do konta <span class="font-semibold">{{ name.value }}</span
          >:
          <p>
            <code class="text-sm">{{ keyString }}</code>
          </p>
        </div>
        <div class="mt-8 flex justify-end">
          <router-link to="/auth">
            <UButton>Przejdź do logowania</UButton>
          </router-link>
        </div>
      </div>
      <form v-else @submit.prevent="onSubmit">
        <div class="flex flex-col">
          <UInput
            :id="uid"
            :name="uid"
            type="text"
            v-bind="name"
            placeholder="Login"
          />
          <p class="text-red-400 text-sm">{{ errors.name }}</p>
        </div>

        <div class="mt-4">
          <UButton type="submit" block>Prześlij</UButton>
        </div>
      </form>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useToast } from "vue-toastification";
import { $fetch } from "ofetch";
import { apiPaths, url } from "@/common/constants/api-paths";
import { zResponse } from "~/common/models/response";

const uid = Math.random().toString();
const toast = useToast();

const keyString = ref<string | null>(null);

const registerSchema = toTypedSchema(
  z.object({
    name: z
      .string({ required_error: "Imię jest wymagane" })
      .min(1, "Imię jest wymagane"),
  }),
);
const { handleSubmit, errors, defineInputBinds } = useForm({
  validationSchema: registerSchema,
});

const name = defineInputBinds("name");

const registerResponseSchema = zResponse(
  z.object({
    keyString: z.string(),
  }),
);

const onSubmit = handleSubmit(async (values) => {
  const response = await $fetch(url(apiPaths.auth.register), {
    method: "POST",
    body: JSON.stringify(values),
    ignoreResponseError: true,
  });
  const data = registerResponseSchema.parse(response);

  if (data.success) {
    keyString.value = data.data.keyString;
  }

  data.success ? toast.success(data.message) : toast.error(data.message);
});
</script>
