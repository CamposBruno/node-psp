'use strict'

class BadRequest extends Error {
  constructor (message, status) {
    super(message)
    this.status = status
    this.code = 400
  }
}

module.exports = BadRequest
