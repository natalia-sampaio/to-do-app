<script setup>
defineProps({
    numberOfUncheckedItems: Number
})
</script>

<template>
    <div v-if="numberOfUncheckedItems > 0" class="flex items-center justify-between p-4">
        <span>{{ numberOfUncheckedItems }} items left</span>
        <button>Clear Completed</button>
    </div>
</template>