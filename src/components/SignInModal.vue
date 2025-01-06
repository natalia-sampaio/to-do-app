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
import { useUserStore } from '../stores/user';
import { ref } from 'firebase/storage';
import { useRouter } from 'vue-router';

defineProps({ dark: Boolean });

const userStore = useUserStore();

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
        userStore.$patch({
            name: formData.name,
            email: formData.email
        });
        signInWithEmailAndPassword(getAuth(), formData.email, formData.password)
            .then(() => {
                router.push('/logged-in');
            })
            .catch((error) => {
                animateButton();
                if (error.code == 'auth/user-not-found') {
                    $externalResults.value = { email: 'User not found, please register.' };
                }
                if (error.code == 'auth/wrong-password') {
                    $externalResults.value = { email: 'User and/or password are incorrect' };
                }
            });
    } else {
        animateButton();
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
            animateButton();
            if (error.code == 'auth/user-not-found') {
                $externalResults.value = { email: 'User not found, please register.' };
            }
            if (error.code == 'auth/wrong-password') {
                $externalResults.value = { email: 'User and/or password are incorrect' };
            }
        });
}

const warn = ref(false);

function animateButton() {
    warn.value = true;
    setTimeout(() => {
        warn.value = false;
    }, 1500);
}
</script>

<template>
    <label for="signin-modal" class="btn" :data-theme="dark ? 'dark' : 'aqua'">sign in</label>
    <input type="checkbox" id="signin-modal" class="modal-toggle" />
    <div
        class="modal modal-bottom sm:modal-middle"
        role="dialog"
        :data-theme="dark ? 'dark' : 'aqua'"
    >
        <div class="modal-box">
            <label
                for="signin-modal"
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
                ✕
            </label>
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Email</span>
                </label>
                <input
                    v-model="formData.email"
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered w-full"
                    aria-label="name input"
                />
                <label
                    class="label text-red-600"
                    v-for="error in v$.email.$errors"
                    :key="error.$uid"
                >
                    {{ error.$message }}
                </label>
                <label class="label">
                    <span class="label-text">Password</span>
                </label>
                <input
                    v-model="formData.password"
                    type="password"
                    placeholder="Type here"
                    class="input input-bordered w-full"
                    aria-label="password input"
                />
                <label
                    class="label text-red-600"
                    v-for="error in v$.password.$errors"
                    :key="error.$uid"
                >
                    {{ error.$message }}
                </label>
            </div>
            <div class="modal-action justify-between">
                <label for="signin-modal" class="btn" @click="signInWithGoogle"
                    >Sign in with Google</label
                >
                <label class="btn" @click="submitForm">Sign in with email</label>
            </div>
        </div>
    </div>
</template>
