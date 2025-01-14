<script setup>
import useVuelidate from '@vuelidate/core';
import { required, minLength, email, sameAs } from '@vuelidate/validators';
import { reactive, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useUserStore } from '../stores/user.js';
import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
} from 'firebase/auth';
import IconUser from './icons/IconUser.vue';
import IconEmail from './icons/IconEmail.vue';
import IconKey from './icons/IconKey.vue';

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
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then(async (data) => {
                await updateProfile(data.user, { displayName: formData.name });

                userStore.name = formData.name;
                userStore.email = data.user.email;
                userStore.uid = data.user.uid;
                userStore.addTodo();

                //router.push('/logged-in');
            })
            .catch((error) => {
                if (error.message == 'Firebase: Error (auth/email-already-in-use).') {
                    $externalResults.value = { email: 'E-mail already in use, please sign in' };
                } else {
                    alert(error.message);
                    console.log(error);
                }
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
            userStore.addTodo();
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

watch(
    () => formData.email,
    (newEmail) => {
        if (newEmail) {
            $externalResults.value.email = '';
        }
    }
);
</script>

<template>
    <label for="signup-modal" class="btn btn-primary btn-outline">{{ $t('header.signUp') }}</label>
    <input type="checkbox" id="signup-modal" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle" role="dialog">
        <div class="modal-box">
            <label
                for="signup-modal"
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
                ✕
            </label>
            <div class="form-control w-full flex flex-col gap-6 mt-6">
                <div>
                    <label class="input input-bordered flex items-center gap-2">
                        <IconUser />
                        <input
                            v-model="formData.name"
                            type="text"
                            class="grow bg-[inherit] focus:outline-none"
                            :placeholder="$t('placeholders.name')"
                            aria-label="name input"
                        />
                    </label>
                    <label v-for="error in v$.name.$errors" :key="error.$uid" class="text-error">
                        {{ error.$message }}
                    </label>
                </div>
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
                    <label v-for="error in v$.email.$errors" :key="error.$uid" class="text-error"
                        >{{ error.$message }}
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
                    <label v-for="error in v$.password.$errors" :key="error.$uid" class="text-error"
                        >{{ error.$message }}
                    </label>
                </div>
                <div>
                    <label class="input input-bordered flex items-center gap-2">
                        <IconKey />
                        <input
                            v-model="formData.confirmPassword"
                            type="password"
                            class="grow bg-inherit focus:outline-none"
                            :placeholder="$t('placeholders.password')"
                            aria-label="confirm password input"
                        />
                    </label>
                    <label
                        v-for="error in v$.confirmPassword.$errors"
                        :key="error.$uid"
                        class="text-error"
                        >{{ error.$message }}
                    </label>
                </div>
            </div>
            <div class="modal-action">
                <div class="flex flex-col w-full gap-4">
                    <label class="btn" @click="submitForm">{{
                        $t('signUpModal.signUpWithEmail')
                    }}</label>
                    <label for="signup-modal" class="btn" @click="signInWithGoogle">{{
                        $t('signUpModal.signUpWithGoogle')
                    }}</label>
                </div>
            </div>
        </div>
    </div>
</template>
