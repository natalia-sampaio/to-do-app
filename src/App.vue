<script setup>
import IconSun from './components/icons/IconSun.vue';
import HomeView from './views/HomeView.vue';
import { useTodoStore } from './stores/todo.js'

const todoStore = useTodoStore();

</script>

<template>
  <header class="p-4 bg-dark-mobile bg-no-repeat bg-cover text-center">
    <div class="my-8 flex items-center justify-between">
      <h1 class="text-white font-bold text-2xl">T O D O</h1>
      <IconSun />
    </div>
    <div class="rounded bg-dark-very-dark-desaturated-blue p-4 mb-6 w-full flex items-center justify-start">
      <input type="checkbox" class="indeterminate:bg-dark-very-dark-desaturated-blue checkbox checkbox-xs" aria-label="checkbox">
      <input 
      v-model="todoStore.newItem" 
      @blur="todoStore.addTodo()"
      @keyup.enter="todoStore.addTodo()"
      type="text" 
      placeholder="Create a new todo..." 
      aria-label="Create a new task"
      class="bg-dark-very-dark-desaturated-blue text-dark-dark-grayish-blue pl-2 focus:outline-none">
    </div>
  </header>

  <div class="rounded bg-dark-very-dark-desaturated-blue mx-4 -mt-6 border-b-0">
    <HomeView />
  </div>
</template>