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
import Warning from './components/WarningModal.vue';

const todoStore = useTodoStore();
const userStore = useUserStore();

const activeHeader = shallowRef(userStore.isLoggedIn ? HeaderLoggedIn : HeaderLoggedOut);

const showModal = ref(true);

const isChecked = ref(false);

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
        <div>
            <!-- Modal -->
            <div v-if="showModal" class="modal modal-open">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">🚨 Important Notice</h3>
                    <p class="py-4">
                        This Todo Web App is currently <strong>under development</strong> and is
                        intended for <strong>academic purposes only</strong>.
                    </p>
                    <ul class="list-disc list-inside py-2">
                        <li>
                            <strong>No Security:</strong> Firebase is configured for development;
                            data may not be secure.
                        </li>
                        <li>
                            <strong>Do not use sensitive data:</strong> Avoid storing personal or
                            private information. Users are encouraged to create an account using any
                            invalid or fake email address.
                        </li>
                        <li>
                            <strong>Work in progress:</strong> Features are incomplete and bugs are
                            expected.
                        </li>
                        <li>
                            <strong>Test environment:</strong> This app is for learning purposes
                            only, not production use.
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
                        <button
                            class="btn btn-primary"
                            :disabled="!isChecked"
                            @click="showModal = false"
                        >
                            close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
