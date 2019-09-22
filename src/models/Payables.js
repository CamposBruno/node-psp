'use strict'
const { Sequelize, Model } = require('sequelize')
const Transactions = require('./Transactions')

class Payables extends Model {
  static init (sequelize) {
    super.init({
      status: Sequelize.STRING, // paid | waiting_funds
      payment_date: Sequelize.DATE,
      fee: Sequelize.DECIMAL,
      amount: Sequelize.DECIMAL,
      transaction_id: Sequelize.INTEGER
    },
    {
      sequelize
    })
    this.belongsTo(Transactions, {
      foreignKey: 'transaction_id'
    })
  }

  static getBalance (user_id, status) {
    return Payables.sum('Payables.amount', {
      where: { status },
      include: {
        model: Transactions,
        attributes: [],
        where: { user_id }
      }
    })
  }
}

module.exports = Payables
