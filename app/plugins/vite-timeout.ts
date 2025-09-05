// Increase the Vite Node request timeout
export default defineNuxtPlugin(() => {
  // This plugin increases the timeout for Vite Node requests
  // The default timeout is 10000ms (10 seconds) which is causing timeouts
  // We're setting an environment variable that will be used by Nuxt
  if (process.env.NODE_ENV !== 'production') {
    process.env.NUXT_VITE_NODE_OPTIONS = JSON.stringify({
      ...JSON.parse(process.env.NUXT_VITE_NODE_OPTIONS || '{}'),
      requestTimeout: 30000 // Increase to 30 seconds
    })
  }
})