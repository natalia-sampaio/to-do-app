<script setup>
import SignInModal from '../SignInModal.vue';
import SignUpModal from '../SignUpModal.vue';
</script>
<template>
    <div class="flex items-center gap-4">
        <span class="text-xl first-letter:capitalize">
            {{ $t('header.guest', { hello: $t('header.hello') }) }}
        </span>
        <SignInModal />
        <SignUpModal />
    </div>
</template>
