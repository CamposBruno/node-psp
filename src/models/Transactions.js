'use strict'
const { Sequelize, Model } = require('sequelize')
const kue = require('kue')
const Helper = require('../utils/helper')
// const Users = require('./Users')

class Transactions extends Model {
  static init (sequelize) {
    super.init({
      amount: Sequelize.DECIMAL,
      description: Sequelize.STRING,
      payment_method: Sequelize.STRING,
      card_number: Sequelize.STRING,
      card_holder: Sequelize.STRING,
      expires_at: Sequelize.DATE,
      cvv: Sequelize.STRING,
      user_id: Sequelize.INTEGER
    },
    {
      sequelize
    })

    /* this.belongsTo(Users, {
      foreignKey: 'user_id',
      targetKey: 'id'
    }) */

    this.addHook('beforeSave', transaction => {
      if (transaction.card_number) {
        transaction.card_number = Helper.hideCardNumber(transaction.card_number)
      }
    })

    this.addHook('afterSave', transaction => {
      if (process.env.NODE_ENV === 'test') return

      const job = kue.createQueue({
        prefix: process.env.KUE_PREFIX,
        redis: {
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT
        }
      })

      job.create('payable', transaction)
        .removeOnComplete(true) // REMOVE THE JOB FROM THE QUEUE ONCE IT'S COMPLETED
        .attempts(1) // The maximum number of retries you want the job to have
        .save()
    })

    return this
  }
}

module.exports = Transactions
