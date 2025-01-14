<script setup>
import { useI18n } from 'vue-i18n';
import IconSun from './components/icons/IconSun.vue';
import IconMoon from './components/icons/IconMoon.vue';
import IconAdd from './components/icons/IconAdd.vue';
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

const { locale } = useI18n();
const dark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches);

const activeHeader = shallowRef(userStore.isLoggedIn ? HeaderLoggedIn : HeaderLoggedOut);

const dropdown = ref();
const showWarning = ref(true);

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

function handleLocaleChange(newLocale) {
    locale.value = newLocale;
}
</script>

<template>
    <div :class="{ dark: dark }" :data-theme="dark ? 'forest' : 'pastel'">
        <header class="p-4 sm:p-8 bg-neutral">
            <div class="lg:max-w-3xl mx-auto">
                <div class="my-8 flex items-center justify-between">
                    <div class="flex items-center gap-4">
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

                        <div ref="dropdown" class="dropdown dropdown-right dropdown-hover">
                            <div tabindex="0" role="button" class="btn m-1">{{ $i18n.locale }}</div>
                            <ul
                                tabindex="0"
                                class="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow"
                            >
                                <li
                                    v-for="locale in $i18n.availableLocales"
                                    :key="`locale-${locale}`"
                                    @click="handleLocaleChange(locale)"
                                >
                                    <a>{{ locale }}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <SlideFade>
                        <component
                            :is="activeHeader"
                            @signOut="handleSignOut()"
                            :name="userStore.name"
                        />
                    </SlideFade>
                </div>
                <label class="input flex items-center gap-2 mb-6">
                    <IconAdd
                        class="h-6 w-6 hover:text-primary cursor-pointer"
                        @click="todoStore.addTodo()"
                    />
                    <input
                        v-model="todoStore.newItem"
                        @blur="todoStore.addTodo()"
                        @keyup.enter="todoStore.addTodo()"
                        type="text"
                        class="grow bg-inherit focus:outline-none"
                        :placeholder="$t('placeholders.createNewTodo')"
                        aria-label="Create a new task"
                    />
                </label>
            </div>
        </header>
        <TodoList />
        <WarningModal v-if="showWarning" @close-modal="showWarning = false" />
    </div>
</template>
