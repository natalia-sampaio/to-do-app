<script setup>
import useVuelidate from '@vuelidate/core';
import { required, minLength, email, sameAs } from '@vuelidate/validators';
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useUserStore } from '../stores/user.js';
import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';

const userStore = useUserStore();

const formData = reactive({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
});

const rules = computed(() => {
    return {
        name: {
            required,
            minLength: minLength(3)
        },
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(8)
        },
        confirmPassword: {
            required,
            sameAs: sameAs(formData.password)
        }
    };
});

const $externalResults = ref({});

const v$ = useVuelidate(rules, formData);

const router = useRouter();

async function submitForm() {
    const result = await v$.value.$validate();
    if (result) {
        userStore.$patch({
            name: formData.name,
            email: formData.email
        });
        createUserWithEmailAndPassword(getAuth(), formData.email, formData.password)
            .then((data) => {
                const user = data.user;
                userStore.name = user.name;
                userStore.email = user.email;
                userStore.uid = user.uid;
                userStore.addToFirestore();
                //router.push('/logged-in');
            })
            .catch((error) => {
                alert(error.message);
            });
    } else {
        animateButton();
        router.push('/sign-up');
    }
}

function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
        .then((result) => {
            userStore.email = result.user.email;
            userStore.name = result.user.displayName;
            userStore.uid = result.user.uid;
            userStore.addToFirestore();
            //router.push('/logged-in');
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

/*const showPassword = ref(false);

 function toggleShowPassword() {
    showPassword.value = !showPassword.value;
}; */

const warn = ref(false);

function animateButton() {
    warn.value = true;
    setTimeout(() => {
        warn.value = false;
    }, 1500);
}
</script>

<template>
    <label for="signup-modal" class="btn btn-primary btn-outline">sign up</label>
    <input type="checkbox" id="signup-modal" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle" role="dialog">
        <div class="modal-box">
            <label
                for="signup-modal"
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
                ✕
            </label>
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Name</span>
                </label>
                <input
                    v-model="formData.name"
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered w-full"
                    aria-label="name input"
                />
                <label v-for="error in v$.name.$errors" :key="error.$uid" class="text-red-600">{{
                    error.$message
                }}</label>
                <label class="label">
                    <span class="label-text">Email</span>
                </label>
                <input
                    v-model="formData.email"
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered w-full"
                    aria-label="email input"
                />
                <label v-for="error in v$.email.$errors" :key="error.$uid" class="text-red-600"
                    >{{ error.$message }}
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
                <label v-for="error in v$.password.$errors" :key="error.$uid" class="text-red-600"
                    >{{ error.$message }}
                </label>
                <label class="label">
                    <span class="label-text">Confirm password</span>
                </label>
                <input
                    v-model="formData.confirmPassword"
                    type="password"
                    placeholder="Type here"
                    class="input input-bordered w-full"
                    aria-label="password input"
                />
                <label
                    v-for="error in v$.confirmPassword.$errors"
                    :key="error.$uid"
                    class="text-red-600"
                    >{{ error.$message }}
                </label>
            </div>
            <div class="modal-action justify-between">
                <label for="signup-modal" class="btn" @click="signInWithGoogle"
                    >Sign up with Google</label
                >
                <label class="btn" @click="submitForm">Sign up with email</label>
            </div>
        </div>
    </div>
</template>
