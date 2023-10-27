<template>
  <div class="w-[60%] mx-auto">
    <p v-if="pending">Loading...</p>
    <div v-else>
      <div class="flex flex-col gap-2 pb-4">
        <div>
          <h1
            class="text-5xl font-semibold font-mono tracking-widest bg-gray-900 ring-1 ring-gray-700 rounded-md px-4 py-2 inline-block"
          >
            ADMIN
          </h1>
        </div>
        <div>
          <p
            class="font-mono text-2xl font-semibold tracking-widest bg-gray-900 ring-1 ring-gray-700 rounded-md py-2 px-4 inline-block"
          >
            BAD REQUESTS
          </p>
        </div>
      </div>
      <ul class="flex flex-col gap-4">
        <ListLogElement v-for="log in data" :key="log.id" :log="log" />
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { apiPaths, url } from "~/common/constants/api-paths";
import { logsResponse } from "~/common/models/admin/log";
import ListLogElement from "~/components/page/admin/ListLogElement.vue";

const { pending, data } = await useAsyncData(
  "admin.logs",
  async () => {
    const response = await $fetch(url(apiPaths.log._exact), {
      method: "GET",
      ignoreResponseError: true,
      credentials: "include",
    });

    const data = logsResponse.parse(response);
    return data.success ? data.data : [];
  },
  {
    server: false,
  },
);
</script>
