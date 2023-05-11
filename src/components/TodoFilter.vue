<script setup>
import { useTodoStore } from '../stores/todo';

const todoStore = useTodoStore();

defineProps({
    todoLength: Number
})
</script>

<template>
    <div v-if="todoLength > 0" class="
        rounded 
        bg-light-very-light-gray dark:bg-dark-very-dark-desaturated-blue 
        mx-4 mt-6
        p-4
        flex justify-evenly">
        <input id="all" class="sr-only peer/all" type="checkbox" checked>
        <label for="all" class="peer-checked/all:text-bright-blue">All</label>
        <input id="active" class="sr-only peer/active" type="checkbox">
        <label for="active" class="peer-checked/active:text-bright-blue">Active</label>
        <input id="completed" class="sr-only peer/completed" type="checkbox">
        <label for="completed" class="peer-checked/completed:text-bright-blue">Completed</label>
    </div>
</template>