<script setup>
import { useI18n } from 'vue-i18n';
import SignInModal from '../SignInModal.vue';
import SignUpModal from '../SignUpModal.vue';

const { t } = useI18n();
</script>
<template>
    <div class="flex items-center gap-4">
        <span class="text-xl"> {{ t('message.hello') }} </span>
        <SignInModal />
        <SignUpModal />
    </div>
</template>
