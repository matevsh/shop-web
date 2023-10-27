<template>
  <li class="rounded-md py-2 px-4 bg-gray-900 ring-1 ring-gray-700 gap-2">
    <div>
      <transition name="fadeHeight">
        <div
          class="flex items-center justify-between cursor-pointer"
          @click="isOpen = !isOpen"
        >
          <div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <p class="font-mono font-bold text-gray-400">
                  {{ dayjs(log.createdAt).format("DD:MM:YYYY HH:mm:ss") }}
                </p>
                <code>{{ log.name }}</code>
              </div>
              <div class="h-[24px] w-[24px]">
                <UIcon
                  name="i-mdi-chevron-down"
                  class="h-full w-full transition-all"
                  :class="{
                    'rotate-180': isOpen,
                  }"
                />
              </div>
            </div>
            <div v-if="isOpen">
              <VueJsonPretty
                :value="message"
                :options="{ collapsed: true }"
                class="mt-2"
              />
              {{ JSON.stringify(JSON.parse(message), null, 2) }}
            </div>
          </div>
        </div>
      </transition>
    </div>
  </li>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { z } from "zod";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { logSchema } from "~/common/models/admin/log";

const isOpen = ref(false);

type ListLogElementProps = {
  log: z.infer<typeof logSchema>;
};

const props = defineProps<ListLogElementProps>();

const message = computed(() => {
  try {
    return JSON.parse(props.log.message);
  } catch (e) {
    return props.log.message;
  }
});
</script>

<style>
.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: all 0.2s;
  max-height: 230px;
}
.fadeHeight-enter,
.fadeHeight-leave-to {
  opacity: 0;
  max-height: 0px;
}
</style>
