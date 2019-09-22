'use strict'
const _st = require('lodash/string')

class Helper {
  hideCardNumber (cardNumber) {
    const length = cardNumber.length
    return _st.padStart(cardNumber.substr(length - 4), length, '*')
  }
}

module.exports = new Helper()
