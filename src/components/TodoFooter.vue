<script setup>
import { useTodoStore } from '../stores/todo';

const todoStore = useTodoStore();

defineProps({
    numberOfUncheckedItems: Number,
    todoLength: Number
});
</script>

<template>
    <div v-if="todoLength > 0" class="flex items-center justify-between p-4">
        <span>{{ numberOfUncheckedItems }} items left</span>
        <button
            v-if="todoStore.filter != 'active'"
            @click="todoStore.clearCompleted"
            class="hover:link-hover"
        >
            Clear Completed
        </button>
    </div>
</template>
