'use strict'
const Transactions = require('../models/Transactions')
const BadRequest = require('../errors/BadRequest')

class TransactionController {
  async validateStore (req, res, next) {
    // valida inputs antes de entrar no store
    const { amount, description, payment_method, card_number, card_holder, expires_at, cvv } = req.body
    try {
      if (!amount || typeof amount !== 'number') throw new BadRequest('amount missing', 'amount_missing')
      if (!description || typeof description !== 'string') throw new BadRequest('description missing', 'description_missing')
      if (!payment_method || typeof payment_method !== 'string') throw new BadRequest('payment_method missing', 'paymentMethod_missing')
      if (!card_number || typeof card_number !== 'string') throw new BadRequest('card_number missing', 'cardNumber_missing')
      if (!card_holder || typeof card_holder !== 'string') throw new BadRequest('card_holder missing', 'cardHolder_missing')
      if (!expires_at || typeof expires_at !== 'string') throw new BadRequest('expires_at missing', 'expiresAt_missing')
      if (!cvv || typeof cvv !== 'string') throw new BadRequest('cvv missing', 'cvv_missing')
      return next()
    } catch (error) {
      return res.status(error.code).json({
        error: error.message
      })
    }
  }

  async store (req, res) {
    try {
      const transaction = await Transactions.create({ ...req.body, user_id: req.user_id })
      return res.json(transaction)
    } catch (error) {
      // TODO: centralizar erros da api
      console.log('Error insert transaction', error)
      return res.status(error.code || 500)
    }
  }

  async index (req, res) {
    try {
      const user_id = req.user_id
      const transactions = await Transactions.findAll({ where: { user_id } })
      return res.status(200).json(transactions)
    } catch (error) {
      // TODO: centralizar erros da api
      console.log('Error listing transactions', error)
      return res.status(error.code || 500)
    }
  }
}

module.exports = new TransactionController()
