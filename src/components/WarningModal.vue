<template>
    <div>
        <div v-if="showModal" class="modal modal-open">
            <div class="modal-box">
                <h3 class="font-bold text-lg">🚨 Important Notice</h3>
                <p class="py-4">
                    This Todo Web App is currently <strong>under development</strong> and is
                    intended for <strong>academic purposes only</strong>.
                </p>
                <ul class="list-disc list-inside py-2">
                    <li>
                        <strong>No Security:</strong> Firebase is configured for development; data
                        may not be secure.
                    </li>
                    <li>
                        <strong>Do not use sensitive data:</strong> Avoid storing personal or
                        private information.
                    </li>
                    <li>
                        <strong>Work in progress:</strong> Features are incomplete and bugs are
                        expected.
                    </li>
                    <li>
                        <strong>Test environment:</strong> This app is for learning purposes only,
                        not production use.
                    </li>
                </ul>
                <div class="modal-action">
                    <!-- Dismiss Button -->
                    <button class="btn btn-primary" @click="showModal = false">I Understand</button>
                </div>
            </div>
        </div>
    </div>
</template>
