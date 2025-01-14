<script setup>
import TodoFooter from '../components/TodoFooter.vue';
import TodoItem from '../components/TodoItem.vue';
import { useTodoStore } from '../stores/todo.js';
import { computed, ref, watchEffect } from 'vue';

const todoStore = useTodoStore();

const draggingId = ref(null);

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

function reorderItems(draggedId, targetId) {
    const draggedIndex = todoStore.allItems.findIndex((item) => item.id === draggedId);
    const targetIndex = todoStore.allItems.findIndex((item) => item.id === targetId);

    if (draggedIndex !== -1 && targetIndex !== -1 && draggedIndex !== targetIndex) {
        const items = [...todoStore.allItems];
        const [draggedItem] = items.splice(draggedIndex, 1);
        items.splice(targetIndex, 0, draggedItem);
        todoStore.allItems = items;

        if (todoStore.isLoggedIn && todoStore.uid) {
            todoStore.updateFirestore(items);
        } else {
            todoStore.saveToLocalStorage();
        }
    }
}

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
                    <transition-group name="fade" tag="div">
                        <TodoItem
                            v-for="todo in filteredTodos"
                            :key="todo.id"
                            :content="todo.content"
                            :id="todo.id"
                            :status="todo.checked"
                            @itemChecked="toggleTodoStatus(todo.id)"
                            @itemEdited="
                                ({ updatedContent }) => todoStore.editTodo(todo.id, updatedContent)
                            "
                            @itemDeleted="todoStore.deleteItem(todo.id)"
                            @dragStart="draggingId = $event"
                            @dragEnd="draggingId = null"
                            @dragover.prevent="$event.preventDefault()"
                            @drop="reorderItems(draggingId, todo.id)"
                        />
                    </transition-group>
                    <TodoFooter @filterChange="(value) => (todoStore.filter = value)" />
                </div>
            </div>
        </div>
    </Suspense>
</template>
<style>
.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.fade-leave-active {
    position: absolute;
}
</style>
