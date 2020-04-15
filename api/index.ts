'use strict'

const app = require('express')()
const helmet = require('helmet')
const bodyParser = require('body-parser')
// const config = require('../nuxt.config')

require('dotenv').config()

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/test', (req:Request, res:{send:Function})=> {
 res.send('test')
})

module.exports = {
  handler: app,
  path: '/api'
}
