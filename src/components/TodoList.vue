<script setup>
import { useTodoStore } from '../stores/todo.js';
import { computed, onMounted } from 'vue';

const todoStore = useTodoStore();
const tasks = computed(() => todoStore.filteredItems);

onMounted(() => {
    todoStore.fetchTodos();
});
</script>

<template>
    <div>
        <h2>Blockchain Tasks</h2>
        <ul>
            <li v-for="task in tasks" :key="task.id">
                {{ task.content }} - {{ task.checked ? '✔️ Completed' : '❌ Not Done' }}
                <button @click="todoStore.updateCompleted(task.id)" class="btn btn-success">
                    Toggle Status
                </button>
                <button @click="todoStore.deleteItem(task.id)" class="btn btn-danger">
                    Remove
                </button>
            </li>
        </ul>
    </div>
</template>
