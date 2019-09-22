'use strict'
const Payables = require('../models/Payables')
class Balances {
  async index (req, res) {
    try {
      const available = await Payables.getBalance(req.user_id, 'paid')
      const waitingFunds = await Payables.getBalance(req.user_id, 'waiting_funds')

      return res.status(200).json({
        available,
        waitingFunds
      })
    } catch (error) {
      // TODO: centralize errors
      console.log(error)
      return res.status(500).json({})
    }
  }
}

module.exports = new Balances()
