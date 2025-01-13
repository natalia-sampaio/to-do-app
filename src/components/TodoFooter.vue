<script setup>
import { useI18n } from 'vue-i18n';
import { useTodoStore } from '../stores/todo';
import { computed, ref } from 'vue';

const todoStore = useTodoStore();
const { t } = useI18n();

defineProps({
    todoLength: Number
});

const emit = defineEmits(['filterChange']);

const selectedFilter = ref('all');

const filterOptions = computed(() => [
    {
        label: t('todoFooter.filters.all'),
        value: 'all',
        peerClass: 'peer/all',
        peerCheckedClass: 'peer-checked/all:text-primary',
        disabled: todoStore.todos.length === 0,
        peerDisabledClass: 'peer-disabled/all:opacity-30 peer-disabled/all:cursor-not-allowed'
    },
    {
        label: t('todoFooter.filters.notDone'),
        value: 'notDone',
        peerClass: 'peer/notDone',
        peerCheckedClass: 'peer-checked/notDone:text-primary',
        disabled: todoStore.notDoneItems.length === 0,
        peerDisabledClass:
            'peer-disabled/notDone:opacity-30 peer-disabled/notDone:cursor-not-allowed'
    },
    {
        label: t('todoFooter.filters.done'),
        value: 'done',
        peerClass: 'peer/done',
        peerCheckedClass: 'peer-checked/done:text-primary',
        disabled: todoStore.doneItems.length === 0,
        peerDisabledClass: 'peer-disabled/done:opacity-30 peer-disabled/done:cursor-not-allowed'
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
    <div
        v-if="todoStore.todoLength > 0"
        class="flex items-center justify-between p-4 rounded-b-[inherit]"
    >
        <span class="first-letter:capitalize">{{
            $t('todoFooter.itemsLeft', { count: todoStore.numberOfUncheckedItems })
        }}</span>
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
                        'sm:p-2 cursor-pointer first-letter:capitalize ' +
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
            class="hover:link-hover disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:no-underline first-letter:capitalize"
            :disabled="todoStore.doneItems.length === 0"
        >
            {{ $t('todoFooter.clearDone', { count: todoStore.doneItems.length }) }}
        </button>
    </div>
</template>
