<template>
  <div class="relative">
    <label
      for="file-input"
      class="block text-sm py-1.5 ring-1 ring-[#374151] rounded-md px-2.5 cursor-pointer"
      ><span
        class="w-[70%] truncate"
        :class="{
          'opacity-30': !modelValue,
        }"
      >
        {{ modelValue ? modelValue?.name : label }}
      </span>
    </label>
    <input
      id="file-input"
      class="opacity-0 absolute z-[-1]"
      type="file"
      @change="onChange"
    />
    <UIcon
      name="i-mdi-close-thick"
      class="opacity-30 cursor-pointer absolute top-1/2 -translate-y-1/2 right-3"
      :class="{ 'rotate-45 transition-all': !modelValue }"
      @click="$emit('update:modelValue')"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: File | undefined;
  label: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: File | undefined): void;
}>();

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  emit("update:modelValue", file);
};
</script>
