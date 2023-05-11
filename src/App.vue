<script setup>
import IconSun from './components/icons/IconSun.vue';
import IconMoon from './components/icons/IconMoon.vue';
import HomeView from './views/HomeView.vue';
import { useTodoStore } from './stores/todo.js'
import { ref } from 'vue';

const todoStore = useTodoStore();

const dark = ref(true);

</script>

<template>
  <div :class="{ dark: dark }">
      <header class="p-4 bg-light dark:bg-dark bg-cover text-center">
      <div class="my-8 flex items-center justify-between">
        <h1 class="text-white font-bold text-2xl">T O D O</h1>
        <IconSun v-if="dark" @click="dark = !dark" />
        <IconMoon v-else @click="dark = !dark" />
      </div>
      <div class="rounded bg-light-very-light-gray dark:bg-dark-very-dark-desaturated-blue p-4 mb-6 w-full flex items-center justify-start">
        <input type="checkbox" class="checkbox checkbox-xs" aria-label="checkbox">
        <input 
        v-model="todoStore.newItem" 
        @blur="todoStore.addTodo()"
        @keyup.enter="todoStore.addTodo()"
        type="text" 
        placeholder="Create a new todo..." 
        aria-label="Create a new task"
        class="bg-light-very-light-gray dark:bg-dark-very-dark-desaturated-blue text-dark-dark-grayish-blue pl-2 focus:outline-none">
      </div>
    </header>
    
    <HomeView />
     
  </div>
</template>