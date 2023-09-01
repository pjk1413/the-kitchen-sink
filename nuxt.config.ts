// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // Public keys that are exposed to the client
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:8000/'
    }
  },
  ssr: true,
  app: {
    pageTransition: false,
    layoutTransition: false
  },
  devtools: { enabled: false },
  css: [
    // 'quasar/variables'
    // 'quasar/fonts',
    // 'quasar/animations',
    // 'quasar/icons',
    // 'quasar/css',
    // 'quasar/brand'
    '~/assets/css/_typography.scss'
  ],
  link: [
    { rel:"script", type:"script", href:'https://js.stripe.com/v3/buy-button.js' }
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/_variables.scss" as *;'
        }
      }
    }
  },
  modules: [
    'nuxt-quasar-ui',
    '@pinia/nuxt'
  ],
  quasar: {
    sassVariables: true,
    cssAddon: true,
  }
})
