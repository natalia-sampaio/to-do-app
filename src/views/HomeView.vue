<script setup>
import TodoFooter from '../components/TodoFooter.vue';
import TodoItem from '../components/TodoItem.vue';
import TodoFilter from '../components/TodoFilter.vue';
import { useTodoStore } from '../stores/todo.js'

const todoStore = useTodoStore();
</script>

<template>
  <div class="
  bg-light-very-light-grayish-blue dark:bg-dark-very-dark-blue 
  relative 
  w-full h-screen">
    <div class="absolute -top-6 left-0 right-0 ">
      <div class="
      bg-light-very-light-gray dark:bg-dark-very-dark-desaturated-blue
      mx-4
      rounded border-b-0 drop-shadow-lg">
        <div class="rounded bg-light-very-light-gray dark:bg-dark-very-dark-desaturated-blue mx-4 border-b-0">
          <TodoItem v-for="{ id, content } in todoStore.todos" :key="id" :content="content" :id="id" />
          <TodoFooter 
          :numberOfUncheckedItems="todoStore.numberOfUncheckedItems" 
          :todoLength="todoStore.todoLength" />
        </div>
      </div>
      <TodoFilter />
    </div>
  </div>
</template>
