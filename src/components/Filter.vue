<script setup>
import { useTodoStore } from '../stores/todo';

const todoStore = useTodoStore();
</script>

<template>
    <div v-if="todoStore.allItems.length > 0" class="
        rounded 
        bg-light-very-light-gray dark:bg-dark-very-dark-desaturated-blue 
        mx-4 mt-6
        p-4
        flex justify-evenly">

        <input name="filter" id="all" class="sr-only peer/all" type="radio" value="all" v-model="todoStore.filter" @focus="todoStore.showAll">
        <label for="all" class="peer-checked/all:text-bright-blue">All</label>

        <input name="filter" id="active" class="sr-only peer/active" type="radio" value="active" v-model="todoStore.filter" @focus="todoStore.showActive">
        <label for="active" class="peer-checked/active:text-bright-blue">Active</label>

        <input name="filter" id="completed" class="sr-only peer/completed" type="radio" value="completed" v-model="todoStore.filter" @focus="todoStore.showCompleted">
        <label for="completed" class="peer-checked/completed:text-bright-blue">Completed</label>
    </div>
</template>