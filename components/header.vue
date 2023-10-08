<template>
  <header class="flex justify-between p-2 h-[60px]">
<!--    <h1 class="text-3xl font-semibold">mefi-shop</h1>-->
    <router-link class="block cursor-pointer hover:brightness-75 transition" to="/">
      <img src="/logo/default.png" alt="mefi shop" class="h-full w-auto">
    </router-link>

    <div class="flex items-center">
      <UDropdown :items="itemsLogged" :popper="{ placement: 'bottom-start' }">
        <UButton color="white" :label="name" trailing-icon="i-heroicons-chevron-down-20-solid" />

        <template #logout="{item}">
          <UIcon :name="item.icon" class="w-[16px] h-[16px]"/>
          <span class="text-red-400 font-semibold">{{item.label}}</span>
        </template>
      </UDropdown>
    </div>
  </header>
</template>
<script setup lang="ts">
import {useUser} from "~/common/stores/use-user";
import {storeToRefs} from "pinia";
import {useRouter} from "#app";

const store = useUser();
const {user} = storeToRefs(store)
const router = useRouter();

const name = computed(() => store.user?.name ?? "Menu")

const guestItems = [
    [
      {
        label: 'Strona główna',
        icon: 'i-mdi-home',
        click: () => {
          router.push("/")
        }
      },
    ],
    [
      {
        label: 'Logowanie',
        icon: 'i-mdi-account-key',
        click: () => {
          router.push("/auth")
        }
      },
      {
        label: 'Rejestracja',
        icon: 'i-mdi-account-plus',
        click: () => {
          router.push("/auth/register")
        }
      }
    ]
]

const itemsLogged = computed(() => {
  if(!user.value) return guestItems;

  const itemsUser = [
    [{
      label: 'Profil',
      icon: 'i-mdi-user'
    }],[{
    label: 'Strona główna',
    icon: 'i-mdi-home'
  }, {
    label: 'Ustawienia',
    icon: 'i-mdi-cog-box'
  }], [{
    label: 'Wyloguj',
    slot: 'logout',
    icon: 'i-mdi-logout',
    click: () => {
        store.logout()
      }
  }]
  ]

  const itemAdmin = [
      [{
        label: 'Panel admina',
        icon: 'i-mdi-account-wrench'
      }],
      ...itemsUser
  ]

  return user.value?.isAdmin ? itemAdmin : itemsUser
})
</script>