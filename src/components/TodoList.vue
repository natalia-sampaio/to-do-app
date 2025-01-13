<script setup>
import TodoFooter from '../components/TodoFooter.vue';
import TodoItem from '../components/TodoItem.vue';
import { useTodoStore } from '../stores/todo.js';
import { computed, watchEffect } from 'vue';

const todoStore = useTodoStore();

const filteredTodos = computed(() => {
    switch (todoStore.filter) {
        case 'notDone':
            return todoStore.notDoneItems;
        case 'done':
            return todoStore.doneItems;
        default:
            return todoStore.allItems;
    }
});

const toggleTodoStatus = (id) => {
    todoStore.updateCompleted(id);
};

watchEffect(async () => {
    if (todoStore.isLoggedIn) {
        await todoStore.fetchUserTodoList();
    } else {
        todoStore.resetStore();
    }
});
</script>

<template>
    <Suspense>
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
                    <TodoFooter @filterChange="(value) => (todoStore.filter = value)" />
                </div>
            </div>
        </div>
    </Suspense>
</template>
