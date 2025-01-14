<script setup>
import { ref } from 'vue';
import IconCross from './icons/IconCross.vue';
import IconEdit from './icons/IconEdit.vue';
import IconHamburguerMenu from './icons/IconHamburguerMenu.vue';

const props = defineProps({
    content: String,
    id: Number,
    status: Boolean
});

const emit = defineEmits(['itemChecked', 'itemEdited', 'itemDeleted', 'dragStart', 'dragEnd']);

const editMode = ref(false);
const editableContent = ref(props.content);
const isDragging = ref(false);

function toggleEdit() {
    editMode.value = !editMode.value;
}

function saveEdit() {
    if (editableContent.value.trim() !== props.content) {
        emit('itemEdited', { updatedContent: editableContent.value.trim() });
    }
    editMode.value = false;
}

function handleDragStart(e) {
    e.dataTransfer.setData('todoId', props.id);
    emit('dragStart', props.id);
}

function handleDragEnd() {
    emit('dragEnd');
    isDragging.value = false;
}
</script>

<template>
    <div
        class="p-4 group hover:bg-accent flex items-center justify-between border-b border-accent first-of-type:rounded-t-[inherit]"
        draggable="true"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
    >
        <div class="flex gap-2 items-center group-hover:text-accent-content">
            <div
                class="cursor-grab active:cursor-grabbing tooltip"
                :data-tip="$t('tooltips.dragToReorder')"
                aria-label="Drag handle"
            >
                <IconHamburguerMenu class="w-6 h-6" />
            </div>
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
                    class="input input-bordered max-w-xs dark:group-hover:text-accent"
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
            <div class="tooltip tooltip-warning" :data-tip="$t('tooltips.edit')">
                <button
                    class="btn btn-active btn-ghost hover:btn-warning btn-circle btn-xs"
                    @click="toggleEdit"
                >
                    <IconEdit class="w-4 h-4" />
                </button>
            </div>
            <div class="tooltip tooltip-error" :data-tip="$t('tooltips.delete')">
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
