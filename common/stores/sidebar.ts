import { defineStore } from "pinia";

export const SIDEBAR_FORM = {
  SHOP: {
    value: "SHOP",
    label: "Sklep",
  },
  CATEGORY: {
    value: "CATEGORY",
    label: "Kategoria",
  },
  PRODUCT: {
    value: "PRODUCT",
    label: "Produkt",
  },
} as const;

export type SidebarForm = (typeof SIDEBAR_FORM)[keyof typeof SIDEBAR_FORM];

export const useSidebar = defineStore("sidebar", () => {
  const isOpen = ref(false);
  const selectedForm = ref<SidebarForm>(SIDEBAR_FORM.PRODUCT);

  function set(value: boolean) {
    isOpen.value = value;
  }

  function setFormVersion(form: SidebarForm) {
    selectedForm.value = form;
  }

  return { isOpen, set, selectedForm, setFormVersion };
});
