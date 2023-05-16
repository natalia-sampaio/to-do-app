<script setup>
import IconSun from './components/icons/IconSun.vue';
import IconMoon from './components/icons/IconMoon.vue';
import HomeView from './views/HomeView.vue';
import { useTodoStore } from './stores/todo.js'
import { ref } from 'vue';
import FormItem from './components/FormItem.vue';

const todoStore = useTodoStore();

const dark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches);
</script>

<template>
  <div :class="{ dark: dark }">
    <header class="p-4 sm:p-8 bg-light dark:bg-dark bg-cover">
      <div class="lg:max-w-3xl mx-auto">
        <div class="my-8 flex items-center justify-between">
          <h1 class="text-white font-bold text-2xl">T O D O</h1>
          <div class="flex items-center">
            <IconSun v-if="dark" @click="dark = !dark" />
            <IconMoon v-else @click="dark = !dark" />
            <label for="my-modal" class="btn ml-4">login</label>
            <input type="checkbox" id="my-modal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
              <div class="modal-box">
                <div class="form-control w-full max-w-xs">
                  <FormItem label="Email" errorMessage="error" />
                  <FormItem label="Password" errorMessage="error" />
                </div>
                <div class="modal-action justify-between">
                  <label for="my-modal" class="btn">Sign in with Google</label>
                  <label for="my-modal" class="btn">Sign in with email</label>
                </div>
              </div>
            </div>
          </div>
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
      </div>
      
    </header>
    
    <HomeView />
    
  </div>
</template>