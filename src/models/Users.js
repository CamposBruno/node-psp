'use strict'
const bcrypt = require('bcrypt')
const { Sequelize, Model } = require('sequelize')

class Users extends Model {
  static init (sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING
    },
    {
      sequelize
    })

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 8)
      }
    })

    return this
  }

  checkPassword (password) {
    return bcrypt.compare(password, this.password)
  }
}

module.exports = Users
