<script setup>
defineProps({
    content: String,
    id: Number,
    checked: Boolean
})
</script>

<template>
    <div class="p-4 border-b border-dark-very-dark-grayish-blue flex items-center">
        <input type="checkbox" class="checkbox checkbox-xs"
        aria-label="checkbox" :checked="checked">
        <label class="bg-light-very-light-gray dark:bg-dark-very-dark-desaturated-blue text-dark-dark-grayish-blue pl-2" :class="{ 'line-through': checked }">{{ content }}</label>
    </div>
</template>
