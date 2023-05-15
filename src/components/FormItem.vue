<script setup>

defineProps({
    label: "",
    errorMessage: ""
})
</script>

<template>
    <label class="label">
        <span class="label-text">{{ label }}</span>
    </label>
    <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" aria-label="name input"/>
    <label class="label">
        <span class="text-red-600">{{ errorMessage }}</span>
    </label>
</template>
