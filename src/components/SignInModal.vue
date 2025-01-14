<script setup>
import { computed, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength, email } from '@vuelidate/validators';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup
} from 'firebase/auth';
import { ref } from 'firebase/storage';
import { useRouter } from 'vue-router';
import IconEmail from './icons/IconEmail.vue';
import IconKey from './icons/IconKey.vue';

const formData = reactive({
    email: '',
    password: ''
});

const rules = computed(() => {
    return {
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(8)
        }
    };
});

const $externalResults = ref({});

const v$ = useVuelidate(rules, formData);

const router = useRouter();

async function submitForm() {
    $externalResults.value = {};
    const result = await v$.value.$validate();

    if (result) {
        signInWithEmailAndPassword(getAuth(), formData.email, formData.password)
            .then(() => {
                router.push('/logged-in');
            })
            .catch((error) => {
                //alert(error.message);
                //animateButton();
                if (error.message == 'Firebase: Error (auth/invalid-credential).') {
                    $externalResults.value = {
                        email: 'User and/or password are incorrect',
                        password: 'User and/or password are incorrect'
                    };
                }
            });
    } else {
        //animateButton();
        router.push('/sign-in');
    }
}

function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
        .then(() => {
            router.push('/logged-in');
        })
        .catch((error) => {
            //animateButton();
            alert(error.message);
            /* if (error.code == 'auth/user-not-found') {
                $externalResults.value = { email: 'User not found, please register.' };
            }
            if (error.code == 'auth/wrong-password') {
                $externalResults.value = { password: 'User and/or password are incorrect' };
            } */
        });
}

/* const warn = ref(false);

function animateButton() {
    warn.value = true;
    setTimeout(() => {
        warn.value = false;
    }, 1500);
} */
</script>

<template>
    <label for="signin-modal" class="btn btn-primary">{{ $t('header.signIn') }}</label>
    <input type="checkbox" id="signin-modal" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle" role="dialog">
        <div class="modal-box">
            <label
                for="signin-modal"
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
                ✕
            </label>
            <div class="form-control w-full flex flex-col gap-6 mt-6">
                <div>
                    <label class="input input-bordered flex items-center gap-2">
                        <IconEmail />
                        <input
                            v-model="formData.email"
                            type="text"
                            class="grow bg-inherit focus:outline-none"
                            :placeholder="$t('placeholders.email')"
                            aria-label="email input"
                        />
                    </label>
                    <label
                        class="label text-red-600"
                        v-for="error in v$.email.$errors"
                        :key="error.$uid"
                    >
                        {{ error.$message }}
                    </label>
                    <label v-if="$externalResults.email" class="text-error">
                        {{ $externalResults.email }}
                    </label>
                </div>
                <div>
                    <label class="input input-bordered flex items-center gap-2">
                        <IconKey />
                        <input
                            v-model="formData.password"
                            type="password"
                            class="grow bg-inherit focus:outline-none"
                            :placeholder="$t('placeholders.password')"
                            aria-label="password input"
                        />
                    </label>
                    <label
                        class="label text-red-600"
                        v-for="error in v$.password.$errors"
                        :key="error.$uid"
                    >
                        {{ error.$message }}
                    </label>
                    <label v-if="$externalResults.password" class="text-error">
                        {{ $externalResults.password }}
                    </label>
                </div>
            </div>
            <div class="modal-action">
                <div class="w-full flex flex-col gap-4">
                    <label class="btn w-full" @click="submitForm">{{
                        $t('signInModal.signInWithEmail')
                    }}</label>
                    <label class="btn w-full" @click="signInWithGoogle">{{
                        $t('signInModal.signInWithGoogle')
                    }}</label>
                </div>
            </div>
        </div>
    </div>
</template>
