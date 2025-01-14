<script setup>
import { ref } from 'vue';
import IconCross from './icons/IconCross.vue';
import IconEdit from './icons/IconEdit.vue';

const props = defineProps({
    content: String,
    id: Number,
    status: Boolean
});

const emit = defineEmits(['itemChecked', 'itemEdited', 'itemDeleted']);
const editMode = ref(false);
const editableContent = ref(props.content);

function toggleEdit() {
    editMode.value = !editMode.value;
}

function saveEdit() {
    if (editableContent.value.trim() !== props.content) {
        emit('itemEdited', { updatedContent: editableContent.value.trim() });
    }
    editMode.value = false;
}
</script>

<template>
    <div
        class="p-4 group hover:bg-accent flex items-center justify-between border-b border-accent first-of-type:rounded-t-[inherit]"
    >
        <div class="flex gap-2 items-center group-hover:text-accent-content">
            <input
                type="checkbox"
                class="checkbox checkbox-xs group-hover:border-accent-content"
                aria-label="checkbox"
                :checked="status"
                @change="emit('itemChecked')"
            />
            <template v-if="editMode">
                <input
                    type="text"
                    class="input input-bordered max-w-xs group-hover:text-accent-content dark:group-hover:text-accent"
                    v-model="editableContent"
                    @blur="saveEdit"
                    @keyup.enter="saveEdit"
                />
            </template>
            <template v-else>
                <span
                    class="input group-hover:bg-accent content-center cursor-text max-w-xs w-full"
                    :class="{ 'line-through': status }"
                    @dblclick="toggleEdit"
                >
                    {{ content }}
                </span>
            </template>
        </div>
        <div class="flex items-center gap-2 group-hover:text-accent-content">
            <div class="tooltip tooltip-warning" data-tip="edit">
                <button
                    class="btn btn-active btn-ghost hover:btn-warning btn-circle btn-xs"
                    @click="toggleEdit"
                >
                    <IconEdit class="w-4 h-4" />
                </button>
            </div>
            <div class="tooltip tooltip-error" data-tip="delete">
                <button
                    class="btn btn-active btn-ghost hover:btn-error btn-circle btn-xs"
                    @click="emit('itemDeleted')"
                >
                    <IconCross class="w-4 h-4" />
                </button>
            </div>
        </div>
    </div>
</template>
