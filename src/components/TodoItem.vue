<script setup>
defineProps({
    content: String,
    id: Number,
    checked: Boolean
});
</script>

<template>
    <div class="p-4 flex items-center">
        <input
            type="checkbox"
            class="checkbox checkbox-xs"
            aria-label="checkbox"
            :checked="checked"
        />
        <label class="pl-2" :class="{ 'line-through': checked }">{{ content }}</label>
    </div>
</template>
