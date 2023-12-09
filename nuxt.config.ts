// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    // ...
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  app: {
    head: {
      link: [
        {
          href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
          rel: 'stylesheet'
        }]
    }
  }
})
