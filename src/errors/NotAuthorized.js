'use strict'

class NotAuthorized extends Error {
  constructor (message, status) {
    super(message)
    this.status = status
    this.code = 401
  }
}

module.exports = NotAuthorized
