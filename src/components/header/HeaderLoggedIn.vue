<script setup>
import IconSignOut from '../icons/IconSignOut.vue';

const emit = defineEmits(['signOut']);

defineProps({
    name: String
});
</script>
<template>
    <div class="flex gap-4 items-center">
        <Suspense>
            <span class="text-xl"> Olá, {{ name }} </span>
            <template #fallback> Loading... </template>
        </Suspense>

        <button class="btn btn-primary btn-circle" @click="emit('signOut')">
            <IconSignOut class="h-6 w-6" />
        </button>
    </div>
</template>
