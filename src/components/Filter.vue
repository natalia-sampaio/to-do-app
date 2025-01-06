<script setup>
import { useTodoStore } from '../stores/todo';

const todoStore = useTodoStore();
</script>

<template>
    <div
        v-if="todoStore.allItems.length > 0"
        class="mt-6 sm:mx-auto p-4 sm:p-0 sm:w-fit sm:relative sm:-top-[72px] flex justify-evenly"
    >
        <input
            name="filter"
            id="all"
            class="sr-only peer/all"
            type="radio"
            value="all"
            v-model="todoStore.filter"
            @focus="todoStore.showAll"
        />
        <label for="all" class="sm:p-2 peer-checked/all:text-primary">All</label>

        <input
            name="filter"
            id="active"
            class="sr-only peer/active"
            type="radio"
            value="active"
            v-model="todoStore.filter"
            @focus="todoStore.showActive"
        />
        <label for="active" class="sm:p-2 peer-checked/active:text-primary">Active</label>

        <input
            name="filter"
            id="completed"
            class="sr-only peer/completed"
            type="radio"
            value="completed"
            v-model="todoStore.filter"
            @focus="todoStore.showCompleted"
        />
        <label for="completed" class="sm:p-2 peer-checked/completed:text-primary">Completed</label>
    </div>
</template>
