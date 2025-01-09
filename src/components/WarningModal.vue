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
                <IconWarning class="h-6 w-6 text-warning" /> Important Notice
            </h3>
            <p class="py-4">
                This Todo Web App is currently <strong>under development</strong> and is intended
                for <strong>academic purposes only</strong>.
            </p>
            <ul class="list-disc list-inside py-2 border-b border-warning">
                <li>
                    <strong>No Security:</strong> Firebase is configured for development; data may
                    not be secure.
                </li>
                <li>
                    <strong>Do not use sensitive data:</strong> Avoid storing personal or private
                    information. Users are encouraged to create an account using any invalid or fake
                    email address.
                </li>
                <li>
                    <strong>Work in progress:</strong> Features are incomplete and bugs are
                    expected.
                </li>
                <li>
                    <strong>Test environment:</strong> This app is for learning purposes only, not
                    production use.
                </li>
            </ul>
            <p class="py-2 text-warning font-bold">
                By continuing, you acknowledge that you are proceeding at your own risk.
            </p>
            <label class="label cursor-pointer gap-4 w-fit">
                <input
                    v-model="isChecked"
                    type="checkbox"
                    checked="checked"
                    class="checkbox checkbox-warning"
                />
                <span class="label-text">I Understand</span>
            </label>

            <div class="modal-action">
                <form method="dialog">
                    <button
                        class="btn btn-primary"
                        :disabled="!isChecked"
                        @click="emit('closeModal')"
                    >
                        close
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
