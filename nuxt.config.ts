// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    "nuxt-quasar-ui",
    "@nuxt/eslint",
    // "nuxt-vuefire"
  ],
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
  },
  typescript: {
    typeCheck: true
  },
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  experimental: {
    restoreState: true
  }
})