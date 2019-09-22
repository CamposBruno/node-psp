'use strict'
const kue = require('kue')
const moment = require('moment')
const Payables = require('../models/Payables')

class PayableJob {
  run () {
    const job = kue.createQueue({
      prefix: process.env.KUE_PREFIX,
      redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
      }
    })

    job.process('payable', process.env.JOBS_PAYABLE_CONCURRENCY, (job, done) => {
      this.handle(job, done, this)
    })
    console.log('Listening for payables...')
  }

  async handle ({ id, data: transaction }, done, that) {
    console.log(`Processing job id ${id} for transaction id ${transaction.id}`)

    const status = that.calculateStatus(transaction.payment_method)
    const payment_date = that.calculatePaymentDate(transaction.payment_method, transaction.createdAt)
    const fee = that.calculateFee(transaction.payment_method)
    const amount = that.calculateAmount(transaction.amount, fee)
    const transaction_id = transaction.id

    console.log(`Transaction paid with method ${transaction.payment_method} so payable status should be ${status} and payment_date ${payment_date}`)
    console.log(`Fee should by ${fee} so payable amount is ${amount}`)

    try {
      await Payables.create({ status, payment_date, fee, amount, transaction_id })
    } catch (error) {
      // TODO : alert sentry that error occourd
      console.log('Error inserting payable ', error)
      return done(error)
    }

    done()
  }

  calculateFee (payment_method) {
    return payment_method === 'debit_card'
      ? 0.03
      : 0.05
  }

  calculatePaymentDate (payment_method, transactionCreation) {
    return payment_method === 'debit_card'
      ? transactionCreation
      : moment(transactionCreation).add(30, 'days')
  }

  calculateStatus (payment_method) {
    return payment_method === 'debit_card'
      ? 'paid'
      : 'waiting_funds'
  }

  calculateAmount (amount, fee) {
    return amount - (amount * fee)
  }
}

module.exports = new PayableJob()
