<template>
  <div class="p-16" v-if="pending">
    <h1>LOADING...</h1>
  </div>
  <div class="p-16" v-else>
    <div v-if="user">
      Jesteś zalogowany jako <span class="font-semibold">{{ user.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useUser} from "~/common/stores/use-user";
import {storeToRefs} from "pinia";

const store = useUser();
const {fetchUser} = store;
const {user} = storeToRefs(store);

const {pending} = await fetchUser();
</script>