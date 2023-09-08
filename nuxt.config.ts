// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000'
      // apiBase: process.env.NUXT_ENV_API_BASE_URL
    }
  },
  ssr: true,
  app: {
    pageTransition: false,
    layoutTransition: false
  },
  devtools: { enabled: false },
  css: [
    '~/assets/css/_typography.scss'
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
