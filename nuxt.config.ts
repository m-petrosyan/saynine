// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: ['@nuxt/eslint', '@nuxt/ui'],
    css: ['@/assets/css/main.css'],
    app: {
        head: {
            title: 'Saynine',
            htmlAttrs: {
                lang: 'en',
            },
            link: [
                {rel: 'icon', type: 'image/x-icon', href: '/favicon.png'},
            ],
        },
    },
})