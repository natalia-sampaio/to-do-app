<script setup>
import { ref } from 'vue';
import { useTodoStore } from '../stores/todo';

const todoStore = useTodoStore();

const checked = ref(false);

defineProps({
    content: String,
    id: Number
})
</script>

<template>
    <div class="p-4 border-b border-dark-very-dark-grayish-blue flex items-center">
        <input type="checkbox" class="checkbox checkbox-xs"
        aria-label="checkbox"
        v-model="checked"
        @change="todoStore.updateCompleted(id)">
        <label class="bg-light-very-light-gray dark:bg-dark-very-dark-desaturated-blue text-dark-dark-grayish-blue pl-2" :class="{ 'line-through': checked }">{{ content }}</label>
    </div>
</template>
