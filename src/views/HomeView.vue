<script setup>
import TodoFooter from '../components/TodoFooter.vue';
import TodoItem from '../components/TodoItem.vue';
import Filter from '../components/Filter.vue';
import { useTodoStore } from '../stores/todo.js';
import { onMounted } from 'vue';

const todoStore = useTodoStore();

onMounted(() => {
    todoStore.showAll();
});
</script>

<template>
    <div class="relative w-full h-screen">
        <div class="absolute -top-6 left-0 right-0 lg:max-w-3xl mx-4 sm:mx-8 lg:mx-auto">
            <div class="card bg-base-100 shadow-xl">
                <div class="mx-4 border-b-0">
                    <TodoItem
                        v-for="todo in todoStore.todos"
                        :key="todo.id"
                        :content="todo.content"
                        :id="todo.id"
                        :checked="todo.checked"
                        @change="todoStore.updateCompleted(todo.id)"
                    />
                    <TodoFooter
                        :numberOfUncheckedItems="todoStore.numberOfUncheckedItems"
                        :todoLength="todoStore.todoLength"
                    />
                </div>
            </div>
            <Filter />
        </div>
    </div>
</template>
