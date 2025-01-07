<script setup>
import { useTodoStore } from '../stores/todo';
import { computed, ref } from 'vue';

const todoStore = useTodoStore();

defineProps({
    numberOfUncheckedItems: Number,
    todoLength: Number
});

const emit = defineEmits(['filterChange']);

const selectedFilter = ref('all');

const filterOptions = computed(() => [
    {
        label: 'All',
        value: 'all',
        peerClass: 'peer/all',
        peerCheckedClass: 'peer-checked/all:text-primary',
        disabled: todoStore.todos.length === 0,
        peerDisabledClass: 'peer-disabled/all:opacity-30 peer-disabled/all:cursor-not-allowed'
    },
    {
        label: 'Active',
        value: 'active',
        peerClass: 'peer/active',
        peerCheckedClass: 'peer-checked/active:text-primary',
        disabled: todoStore.activeItems.length === 0,
        peerDisabledClass: 'peer-disabled/active:opacity-30 peer-disabled/active:cursor-not-allowed'
    },
    {
        label: 'Completed',
        value: 'completed',
        peerClass: 'peer/completed',
        peerCheckedClass: 'peer-checked/completed:text-primary',
        disabled: todoStore.completedItems.length === 0,
        peerDisabledClass:
            'peer-disabled/completed:opacity-30 peer-disabled/completed:cursor-not-allowed'
    }
]);

function changeFilter(value) {
    if (selectedFilter.value !== value) {
        selectedFilter.value = value;
        emit('filterChange', value);
    }
}

function handleClearCompleted() {
    todoStore.clearCompleted();
    changeFilter('all');
}
</script>

<template>
    <div v-if="todoLength > 0" class="flex items-center justify-between p-4 rounded-b-[inherit]">
        <span>{{ numberOfUncheckedItems }} items left</span>
        <div v-if="filterOptions.length" class="flex gap-4">
            <template v-for="option in filterOptions" :key="option.value">
                <input
                    :id="option.value"
                    :name="option.label"
                    :class="'sr-only ' + option.peerClass"
                    type="radio"
                    :value="option.value"
                    :checked="selectedFilter === option.value"
                    :disabled="option.disabled"
                    @change="changeFilter(option.value)"
                />
                <label
                    :for="option.value"
                    :class="
                        'sm:p-2 cursor-pointer ' +
                        option.peerCheckedClass +
                        ' ' +
                        option.peerDisabledClass
                    "
                >
                    {{ option.label }}
                </label>
            </template>
        </div>
        <button
            @click="handleClearCompleted"
            class="hover:link-hover disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:no-underline"
            :disabled="todoStore.completedItems.length === 0"
        >
            Clear Completed
        </button>
    </div>
</template>
