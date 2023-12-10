// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
  modules: [// ...
    '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt',
    //  '@nuxt/ui', "@nuxtjs/tailwindcss"
  ],
  app: {
    head: {
      link: [
        {
          href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
          rel: 'stylesheet'
        }

      ],
      /*      script: [
              {
                src: "https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js"
              },
              {
                src: "https://cdn.datatables.net/responsive/2.1.0/js/dataTables.responsive.min.js"
              },
              {
                src: "https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap5.min.js"
              }
            ]
        */
    }
  }
})