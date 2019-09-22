'use strict'
const Sequelize = require('sequelize')
const databaseConfig = require('../config/database')
const Transactions = require('../models/Transactions')
const Payables = require('../models/Payables')
const Users = require('../models/Users')

const models = [Transactions, Users, Payables]

class Database {
  constructor () {
    this.init()
  }

  init () {
    this.connection = new Sequelize(databaseConfig)
    models.map(models => models.init(this.connection))
  }
}

module.exports = new Database()
