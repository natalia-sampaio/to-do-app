<script setup>
import { ref } from 'vue';
import IconWarning from './icons/IconWarning.vue';

const isChecked = ref(false);

const emit = defineEmits(['closeModal']);
</script>

<template>
    <div class="modal modal-open">
        <div class="modal-box">
            <h3 class="font-bold text-lg flex gap-4 border-b border-warning">
                <IconWarning class="h-6 w-6 text-warning" />
                {{ $t('warningModal.title') }}
            </h3>
            <p class="py-4">
                <i18n-t keypath="warningModal.content" tag="span" scope="global">
                    <strong>{{ $t('placeholders.development') }}</strong>
                    <strong>{{ $t('placeholders.academic') }}</strong>
                </i18n-t>
            </p>
            <ul class="list-disc list-inside pb-4 border-b border-warning">
                <li>
                    <strong>{{ $t('warningModal.list.noSecurity.title') }}</strong>
                    {{ $t('warningModal.list.noSecurity.content') }}
                </li>
                <li>
                    <strong>{{ $t('warningModal.list.noSensitiveData.title') }}</strong>
                    {{ $t('warningModal.list.noSensitiveData.content') }}
                </li>
                <li>
                    <strong>{{ $t('warningModal.list.workInProgress.title') }}</strong>
                    {{ $t('warningModal.list.workInProgress.content') }}
                </li>
                <li>
                    <strong>{{ $t('warningModal.list.testEnvironment.title') }}</strong>
                    {{ $t('warningModal.list.testEnvironment.content') }}
                </li>
            </ul>
            <p class="py-2 text-warning font-bold">
                {{ $t('warningModal.warningText') }}
            </p>
            <label class="label cursor-pointer gap-4 w-fit">
                <input
                    v-model="isChecked"
                    type="checkbox"
                    checked="checked"
                    class="checkbox checkbox-warning"
                />
                <span class="label-text">{{ $t('warningModal.checkbox') }}</span>
            </label>

            <div class="modal-action">
                <form method="dialog">
                    <button
                        class="btn btn-primary"
                        :disabled="!isChecked"
                        @click="emit('closeModal')"
                    >
                        {{ $t('warningModal.closeButton') }}
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
