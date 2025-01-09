<script setup>
import IconSun from './components/icons/IconSun.vue';
import IconMoon from './components/icons/IconMoon.vue';
import { useTodoStore } from './stores/todo.js';
import { ref, shallowRef, watch } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useUserStore } from './stores/user.js';
import TodoList from './components/TodoList.vue';
import HeaderLoggedOut from './components/header/HeaderLoggedOut.vue';
import HeaderLoggedIn from './components/header/HeaderLoggedIn.vue';
import SlideFade from './components/transitions/SlideFade.vue';
import WarningModal from './components/WarningModal.vue';

const todoStore = useTodoStore();
const userStore = useUserStore();

const activeHeader = shallowRef(userStore.isLoggedIn ? HeaderLoggedIn : HeaderLoggedOut);

const showWarning = ref(true);

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
        todoStore.resetStore();
        router.push('/');
    });
}

watch(
    () => userStore.isLoggedIn,
    (isLoggedIn) => {
        activeHeader.value = isLoggedIn ? HeaderLoggedIn : HeaderLoggedOut;
    }
);
</script>

<template>
    <div :class="{ dark: dark }" :data-theme="dark ? 'forest' : 'pastel'">
        <header class="p-4 sm:p-8 bg-neutral">
            <div class="lg:max-w-3xl mx-auto">
                <div class="my-8 flex items-center justify-between">
                    <div class="flex gap-4">
                        <h1 class="font-bold text-2xl">T O D O</h1>
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
                    </div>
                    <SlideFade>
                        <component
                            :is="activeHeader"
                            @signOut="handleSignOut()"
                            :name="userStore.name"
                        />
                    </SlideFade>
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
        <WarningModal v-if="showWarning" @close-modal="showWarning = false" />
    </div>
</template>
