<script setup>
import TodoFooter from '../components/TodoFooter.vue';
import TodoItem from '../components/TodoItem.vue';
import { useTodoStore } from '../stores/todo.js'

const todoStore = useTodoStore();
</script>

<template>
  <main class="rounded bg-dark-very-dark-desaturated-blue mx-4 -mt-6 border-b-0">
    <TodoItem v-for="{ id, content } in todoStore.todos" :key="id" :content="content" :id="id" />
    <TodoFooter 
    :numberOfUncheckedItems="todoStore.numberOfUncheckedItems"
    :todoLength="todoStore.todoLength" />
  </main>
</template>
