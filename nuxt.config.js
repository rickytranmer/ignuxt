const shrinkRay = process.env.NODE_ENV === 'production' ? require('shrink-ray-current') : ()=> {}
// const packageJson = require('./package.json')

let config = {
  // package: { ...packageJson },

  buildModules: [
    '@nuxtjs/dotenv'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    // '@nuxtjs/gtm',
    // '@nuxtjs/pwa',
    // '@nuxtjs/vendor',
    'nuxt-ssr-cache'
  ],

  plugins: [
  ],

  serverMiddleware: [
    // '@/api/index.min.js'
  ],

  head: {
    title: 'ignuxt template',
    titleSeparator: '|',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // { hid: 'title', name: 'og:title', content: '' },
      // { hid: 'description', name: 'og:description', content: '' },
      // { hid: 'image', name: 'og:image', content: '' },
      // { hid: 'url', name: 'og:url', content: '' },
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/iamdustan-smoothscroll/0.4.0/smoothscroll.min.js', defer: true },
    ],
    htmlAttrs: {
      lang: 'en',
    },
  },

  css: [
    '@/assets/css/index.scss',
  ],
  styleResources: {
    scss: [
      '@/assets/css/_helpers.scss',
      '@/assets/css/_variables.scss',
    ],
  },

  loading: false,
  build: {
    loadingScreen: process.env.NODE_ENV!=='production',
    // loadingScreen: process.env.NODE_ENV==='development',
    extractCSS: true,
    extend(config, context) { // - Extend webpack config
      // const { isClient, isDev, isServer, params, query, route } = context // https://nuxtjs.org/api/context/
      const { isDev, isClient } = context

      // config.node = { fs: 'empty' } // - Prevents error when using fs in .vue file
      
      if (isDev) {
        config.devtool = isClient ? 'source-map' : 'inline-source-map'
      }
    },
    publicPath: '/assets/',
  },
  buildDir: '.ssr',
  globalName: 'ignite', // - body > div#__ignite
  generate: { // - Build static files
    dir: 'build',
    // fallback: true, // false: 200 || true: 404 (SPA vs static),  OR  fallback.html
    subFolders: true, // true - folder/index.html || false - folder.html
    exclude: [ // - Ignore any route with ignore in the name
      /^(?=.*\bignore\b).*$/,
    ],
  },

  ignore: [
    '**/*.test.*',
    '**/*.ignore.*'
  ],
  
  router: {
    // base: '/home', // - Deployed directory - https://nuxtjs.org/api/configuration-hooks#redirect-to-router-base-when-not-on-root
    linkActiveClass: 'active',
    linkExactActiveClass: 'active-exact',
    // routeNameSplitter: '/', // - /posts/_id.vue => /posts-id  (default: '-')
  },
  
  vue: {
    config: {
      productionTip: false
    }
  },
  
  env: {},

  render: {
    compressor: shrinkRay({
      filter: (req, res) => (/^\/api/.test(req.originalUrl)) ? false : shrinkRay.filter(req, res)
    })
  },

  vendor: [
    // - Symlinks from node_modules into static/vendor
  ],

  cache: {
    pages: [
      '/'         // all routes
      // /^\/$/   // only root route
    ],

    /**
     * Custom function to return cache key.
     * Ignores previous properties (useHostPrefix, pages).
     * Return falsy value to bypass the cache.
     * @param {string} route 
     * @param {object} context 
     */
    key(route, context) {
      const { req } = context

      if (('' + route).toLowerCase() == '/updatepages') { // - force nuxt-ssr-cache to refresh
        return false
      } else if (process.env.NODE_ENV == 'development') {
        console.log(' ', (req && req.headers) ? (req.headers.referer || req.headers.host) : null, ' ['+new Date().toLocaleTimeString()+']' )
        return false
      } else {
        return true
      }
    },

    store: {
      type: 'memory',
      max: 100, // maximum number of recently used pages
      ttl: 15, // seconds stored in memory
    },
  },

  messages: {
    nuxtjs: '',
    loading: 'Loading...',

    error_404: 'This page could not be found',
    back_to_home: 'Back to the home page',
    
    server_error: 'Server error',
    server_error_details: 'An error occurred in the application and your page could not be served. If you are the application owner, check your logs for details.',

    client_error: 'Error',
    client_error_details: 'An error occurred while rendering the page. Check developer tools console for details.',
  },
}

config.env.nuxtMessages = config.messages
config.env.title = config.head.title + ' ' + (config.head.titleSeparator ? config.head.titleSeparator : '') + ' '

module.exports = config
