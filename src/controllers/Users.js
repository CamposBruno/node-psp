'use strict'
const { BadRequest } = require('../errors')
const Users = require('../models/Users')

class UsersController {
  async validateStore (req, res, next) {
    const { email, name, password } = req.body
    try {
      if (!name || typeof name !== 'string') throw new BadRequest('name missing', 'name_missing')
      if (!email || typeof email !== 'string') throw new BadRequest('email missing', 'email_missing')
      if (!password || typeof password !== 'string') throw new BadRequest('password missing', 'password_missing')

      const userExists = await Users.findOne({ where: { email } })

      if (userExists) throw new BadRequest('user already exists', 'user_exists')

      return next()
    } catch (error) {
      return res.status(error.code).json({
        error: error.message,
        status: error.status
      })
    }
  }

  async store (req, res) {
    try {
      const user = await Users.create(req.body)
      return res.status(200).json(user)
    } catch (error) {
      // TODO: centralizar erros da api
      console.log('Error insert user', error)
      return res.status(error.code || 500).json({
        error: 'Oops! Something went wrong',
        status: error.status || 'internal_server_error'
      })
    }
  }
}

module.exports = new UsersController()
