<script setup>
import TodoFooter from '../components/TodoFooter.vue';
import TodoItem from '../components/TodoItem.vue';
import { useTodoStore } from '../stores/todo.js';
import { computed, onMounted } from 'vue';

const todoStore = useTodoStore();

onMounted(() => {
    todoStore.showAll();
});

const filteredTodos = computed(() => {
    switch (todoStore.filter) {
        case 'active':
            return todoStore.allItems.filter((item) => !item.checked);
        case 'completed':
            return todoStore.allItems.filter((item) => item.checked);
        default:
            return todoStore.allItems;
    }
});

const toggleTodoStatus = (id) => {
    todoStore.updateCompleted(id);
};
</script>

<template>
    <div class="relative w-full h-screen">
        <div class="absolute -top-6 left-0 right-0 lg:max-w-3xl mx-4 sm:mx-8 lg:mx-auto">
            <div class="card bg-base-100 shadow-xl">
                <TodoItem
                    v-for="todo in filteredTodos"
                    :key="todo.id"
                    :content="todo.content"
                    :id="todo.id"
                    :checked="todo.checked"
                    @change="toggleTodoStatus(todo.id)"
                />
                <TodoFooter
                    :numberOfUncheckedItems="todoStore.numberOfUncheckedItems"
                    :todoLength="todoStore.todoLength"
                    @filterChange="(value) => (todoStore.filter = value)"
                />
            </div>
        </div>
    </div>
</template>
