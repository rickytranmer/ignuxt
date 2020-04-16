'use strict'

try {
  require('child_process').execSync('npm run build:nuxt')
} catch (err) {
  console.error(err)
}

const server = require('express')()
const helmet = require('helmet')
const { loadNuxt, build } = require('nuxt')
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3000
const MODE = process.env.NODE_ENV || 'development'

if (!MODE || MODE === 'development') {
  console.error(' - dev: use npm start instead\n - prod: declare NODE_ENV')
  process.exit(9)
}

server.use(helmet())

;(async()=> {
  const nuxt = await loadNuxt(MODE === 'production' ? 'start' : 'dev')

  server.use(nuxt.render)

  if (MODE === 'test') {
    process.env.DEBUG = 'nuxt:*'
    build(nuxt)
  }

  console.log(`${MODE}: listening - ${HOST}:${PORT}`)
  server.listen(PORT, HOST)
})()
