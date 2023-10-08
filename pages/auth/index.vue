<template>
  <div class="grow flex justify-center items-center">
    <UCard>
        <h1 class="font-semibold text-2xl mb-4 text-center">Logowanie</h1>
        <Form @submit="onSubmit">
          <div class="flex flex-col mb-2">
            <UInput type="text" v-bind="name" label="Login" placeholder="Login" />
            <p class="text-red-600 font-semibold">{{ errors.name }}</p>
          </div>
          <div class="flex flex-col">
            <UInput type="password" v-bind="key" label="Key" placeholder="Hasło"/>
            <p class="text-red-600 font-semibold">{{ errors.key }}</p>
          </div>
          <div class="mt-4">
            <UButton type="submit" block>Prześlij</UButton>
          </div>
        </Form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import {Form, useForm} from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import {z} from 'zod';
import {url} from "~/common/constants/api";
import {useRouter} from "#app";
import {useToast} from "vue-toastification";

const router = useRouter()
const toast = useToast()

const loginSchema = toTypedSchema(z.object({
  name: z.string({required_error: "Login jest wymagany"}).min(1, "Login jest wymagany"),
  key: z.string({required_error: "Klucz jest wymagany"}).min(1, "Klucz jest wymagany"),
}))

const loginServerResponse = z.object({
  httpStatus: z.number(),
  message: z.string(),
  success: z.boolean(),
})

const { handleSubmit, errors, defineInputBinds } = useForm({
  validationSchema: loginSchema
});

const name = defineInputBinds('name');
const key = defineInputBinds('key')

const onSubmit = handleSubmit(async (values) => {
  useAsyncData('login', async () => {
    const response = await $fetch(url('/auth/login'), {
      method: 'POST',
      body: JSON.stringify(values),
      credentials: 'include'
    })
    const data = loginServerResponse.parse(response)

    if(data.success) {
      toast.success(data.message);
      return router.push('/')
    } else {
      toast.error(data.message);
    }
  })
})
</script>