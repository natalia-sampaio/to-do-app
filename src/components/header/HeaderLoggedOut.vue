<script setup>
import SignInModal from '../SignInModal.vue';
import SignUpModal from '../SignUpModal.vue';
</script>
<template>
    <div class="flex items-center gap-4">
        <span class="text-xl"> Olá, visitante </span>
        <SignInModal />
        <SignUpModal />
    </div>
</template>
