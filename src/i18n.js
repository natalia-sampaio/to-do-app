import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n';

export const SUPPORT_LOCALES = ['pt', 'en'];

export function detectBrowserLanguage() {
    const browserLanguage = navigator.language || 'en';
    const language = browserLanguage.split('-')[0];
    return SUPPORT_LOCALES.includes(language) ? language : 'en';
}

export function setupI18n(options = { locale: detectBrowserLanguage() }) {
    const i18n = createI18n({
        ...options,
        availableLocales: SUPPORT_LOCALES
    });
    setI18nLanguage(i18n, options.locale);
    return i18n;
}

export function setI18nLanguage(i18n, locale) {
    if (i18n.mode === 'legacy') {
        i18n.global.locale = locale;
    } else {
        i18n.global.locale.value = locale;
    }
    document.querySelector('html').setAttribute('lang', locale);
}

export async function loadLocaleMessages(i18n, locale) {
    try {
        const messages = await import(
            /* webpackChunkName: "locale-[request]" */ `./locales/${locale}.json`
        );

        i18n.global.setLocaleMessage(locale, messages.default);

        return nextTick();
    } catch (error) {
        console.error(`Failed to load locale messages for ${locale}:`, error);
    }
}

// Automatically detect the user's language
export default setupI18n();
