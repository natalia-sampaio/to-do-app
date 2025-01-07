<script setup>
import IconSun from './components/icons/IconSun.vue';
import IconMoon from './components/icons/IconMoon.vue';
import IconSignOut from './components/icons/IconSignOut.vue';
import { useTodoStore } from './stores/todo.js';
import { ref } from 'vue';
import SignInModal from './components/SignInModal.vue';
import SignUpModal from './components/SignUpModal.vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useUserStore } from './stores/user.js';
import TodoList from './components/TodoList.vue';

const todoStore = useTodoStore();
const userStore = useUserStore();

const dark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches);

const router = useRouter();

let auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {
        userStore.isLoggedIn = true;
        userStore.uid = user.uid;
        userStore.getUserInformation;
    } else {
        userStore.isLoggedIn = false;
    }
});

function handleSignOut() {
    signOut(auth).then(() => {
        todoStore.resetStore;
        router.push('/');
    });
}
</script>

<template>
    <div :class="{ dark: dark }" :data-theme="dark ? 'forest' : 'pastel'">
        <header class="p-4 sm:p-8 bg-neutral">
            <div class="lg:max-w-3xl mx-auto">
                <div class="my-8 flex items-center justify-between">
                    <h1 class="font-bold text-2xl">T O D O</h1>
                    <div class="flex items-center gap-4">
                        <span v-if="userStore.isLoggedIn" class="text-xl">
                            Olá, {{ userStore.name }}
                        </span>

                        <label class="swap swap-rotate">
                            <input
                                type="checkbox"
                                class="theme-controller"
                                :checked="!dark"
                                @change="dark = !dark"
                            />
                            <IconSun class="swap-off h-7 w-7" />

                            <IconMoon class="swap-on h-7 w-7" />
                        </label>
                        <SignInModal v-if="!userStore.isLoggedIn" />

                        <SignUpModal v-if="!userStore.isLoggedIn" />

                        <button
                            v-if="userStore.isLoggedIn"
                            class="btn btn-primary btn-circle"
                            @click="handleSignOut()"
                        >
                            <IconSignOut class="h-6 w-6" />
                        </button>
                    </div>
                </div>
                <div class="input p-4 mb-6 w-full flex items-center justify-start">
                    <input type="checkbox" class="checkbox checkbox-xs" aria-label="checkbox" />
                    <input
                        v-model="todoStore.newItem"
                        @blur="todoStore.addTodo()"
                        @keyup.enter="todoStore.addTodo()"
                        type="text"
                        placeholder="Create a new todo..."
                        aria-label="Create a new task"
                        class="input w-full focus:outline-none"
                    />
                </div>
            </div>
        </header>
        <TodoList />
    </div>
</template>
<style>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
