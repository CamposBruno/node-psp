'use strict'
require('./bootstrap')
const express = require('express')
const routes = require('./Routes')
const morgan = require('morgan')
const helmet = require('helmet')
require('./database')

class App {
  constructor () {
    this.server = express()
    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.server.use(express.json())
    this.server.use(helmet())
    if (process.env.NODE_ENV === 'development') this.server.use(morgan('dev'))
  }

  routes () {
    this.server.use(routes)
  }
}

module.exports = new App().server
