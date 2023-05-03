<script setup>
import { RouterView } from 'vue-router'
import IconSun from './components/icons/IconSun.vue';
import IconCheck from './components/icons/IconCheck.vue';
</script>

<template>
  <header class="p-4 bg-dark-mobile bg-no-repeat text-center">
    <div class="my-8 flex items-center justify-between">
      <h1 class="text-white font-bold text-2xl">T O D O</h1>
      <IconSun />
    </div>
    <div class="rounded bg-dark-very-dark-desaturated-blue p-4 mb-4 w-full flex items-center justify-start">
      <input type="checkbox" class="indeterminate:bg-dark-very-dark-desaturated-blue" aria-label="checkbox">
      <input type="text" placeholder="Create a new todo..." aria-label="Create a new task" class="bg-dark-very-dark-desaturated-blue text-dark-dark-grayish-blue pl-2 focus:outline-none">
    </div>
  </header>

  <RouterView />
</template>