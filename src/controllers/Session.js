'use strict'
const jwt = require('jsonwebtoken')
const { BadRequest, NotAuthorized } = require('../errors')
const Users = require('../models/Users')

class Session {
  async validateStore (req, res, next) {
    const { email, password } = req.body
    try {
      if (!email || typeof email !== 'string') throw new BadRequest('email missing', 'email_missing')
      if (!password || typeof password !== 'string') throw new BadRequest('password missing', 'password_missing')

      const user = await Users.findOne({ where: { email } })

      if (!user) throw new NotAuthorized('user not found', 'user_not_found')

      if (!(await user.checkPassword(password))) throw new NotAuthorized('Password does not match', 'password_missmatch')

      req.user = user

      return next()
    } catch (error) {
      return res.status(error.code).json({
        error: error.message
      })
    }
  }

  async store (req, res) {
    const { id, email, name } = req.user
    return res.status(200).json({
      user: {
        id,
        name,
        email
      },
      token: jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
    })
  }
}

module.exports = new Session()
