<script setup>
import IconSun from './components/icons/IconSun.vue';
import IconMoon from './components/icons/IconMoon.vue';
import IconSignOut from './components/icons/IconSignOut.vue';
import HomeView from './views/HomeView.vue';
import { useTodoStore } from './stores/todo.js';
import { onMounted, ref } from 'vue';
import SignInModal from './components/SignInModal.vue';
import SignUpModal from './components/SignUpModal.vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useUserStore } from './stores/user.js';

const todoStore = useTodoStore();
const userStore = useUserStore();

const dark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches);

const router = useRouter();

let auth;

onMounted(() => {
    auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            userStore.isLoggedIn = true;
            userStore.uid = user.uid;
            userStore.getUserInformation;
        } else {
            userStore.isLoggedIn = false;
        }
    });
});

function handleSignOut() {
    signOut(auth).then(() => {
        router.push('/');
    });
}
</script>

<template>
    <div :class="{ dark: dark }">
        <header class="p-4 sm:p-8 bg-light dark:bg-dark bg-cover">
            <div class="lg:max-w-3xl mx-auto">
                <div class="my-8 flex items-center justify-between">
                    <h1 class="text-white font-bold text-2xl">T O D O</h1>
                    <div class="flex items-center gap-4">
                        <span class="text-xl">Olá, {{ userStore.name }}</span>

                        <label class="swap swap-rotate">
                            <!-- this hidden checkbox controls the state -->
                            <input
                                type="checkbox"
                                class="theme-controller"
                                @change="dark = !dark"
                            />

                            <!-- sun icon -->
                            <svg
                                class="swap-off h-10 w-10 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
                                />
                            </svg>

                            <!-- moon icon -->
                            <svg
                                class="swap-on h-10 w-10 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
                                />
                            </svg>
                        </label>

                        <SignInModal v-if="!userStore.isLoggedIn" :dark="dark" />
                        <SignUpModal v-if="!userStore.isLoggedIn" :dark="dark" />

                        <button
                            v-if="userStore.isLoggedIn"
                            class="btn btn-square"
                            :data-theme="dark ? 'dark' : 'aqua'"
                            @click="handleSignOut()"
                        >
                            <IconSignOut class="h-6 w-6" />
                        </button>
                    </div>
                </div>
                <div
                    class="rounded bg-light-very-light-gray dark:bg-dark-very-dark-desaturated-blue p-4 mb-6 w-full flex items-center justify-start"
                >
                    <input type="checkbox" class="checkbox checkbox-xs" aria-label="checkbox" />
                    <input
                        v-model="todoStore.newItem"
                        @blur="todoStore.addTodo()"
                        @keyup.enter="todoStore.addTodo()"
                        type="text"
                        placeholder="Create a new todo..."
                        aria-label="Create a new task"
                        class="bg-light-very-light-gray dark:bg-dark-very-dark-desaturated-blue text-dark-dark-grayish-blue pl-2 focus:outline-none"
                    />
                </div>
            </div>
        </header>

        <HomeView />
    </div>
</template>
