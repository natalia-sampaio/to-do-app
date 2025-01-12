import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import i18n, { loadLocaleMessages, SUPPORT_LOCALES } from './i18n';
import './assets/main.css';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyCSIN2oYA1uGyVWyyyy9d_6vCVkVdhqRd0',
    authDomain: 'todo-app-24b11.firebaseapp.com',
    projectId: 'todo-app-24b11',
    storageBucket: 'todo-app-24b11.firebasestorage.app',
    messagingSenderId: '560497913965',
    appId: '1:560497913965:web:bde2e12ed1d3d911af4f64'
};

const db = getFirestore(initializeApp(firebaseConfig));
const storage = getStorage(initializeApp(firebaseConfig));

async function bootstrap() {
    await Promise.all(SUPPORT_LOCALES.map((locale) => loadLocaleMessages(i18n, locale)));

    const app = createApp(App);
    app.use(createPinia());
    app.use(router);
    app.use(i18n);
    app.mount('#app');
}

bootstrap();

export { db, storage };
