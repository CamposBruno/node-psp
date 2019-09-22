'use strict'
const PayableJob = require('../src/jobs/PayableJob')
const moment = require('moment')

describe('PayableJob/calculateFee', () => {
  it('Should return 0.03 when payment_method === debit_card', () => {
    const fee = PayableJob.calculateFee('debit_card')
    expect(fee).toBe(0.03)
  })

  it('Should return 0.05 when payment_method === credit_card', () => {
    const fee = PayableJob.calculateFee('credit_card')
    expect(fee).toBe(0.05)
  })
})

describe('PayableJob/calculatePaymentDate', () => {
  it('Should return D+0 when payment_method === debit_card', () => {
    const date = moment()
    const payment_date = PayableJob.calculatePaymentDate('debit_card', date)
    expect(payment_date).toBe(date)
  })

  it('Should return D+30 when payment_method === credit_card', () => {
    const date = moment()
    const datePlus30 = moment().add(30, 'days')
    const payment_date = PayableJob.calculatePaymentDate('credit_card', date)

    expect(payment_date.toString()).toBe(datePlus30.toString())
  })
})

describe('PayableJob/calculateStatus', () => {
  it('Should return paid when payment_method === debit_card', () => {
    const status = PayableJob.calculateStatus('debit_card')
    expect(status).toBe('paid')
  })

  it('Should return waiting_funds when payment_method === credit_card', () => {
    const status = PayableJob.calculateStatus('credit_card')
    expect(status).toBe('waiting_funds')
  })
})

describe('PayableJob/calculateAmount', () => {
  it('Should return amount (100) minus 3% === 97', () => {
    const amount = PayableJob.calculateAmount(100, 0.03)
    expect(amount).toBe(97)
  })

  it('Should return amount (100) minus 5% === 95', () => {
    const amount = PayableJob.calculateAmount(100, 0.05)
    expect(amount).toBe(95)
  })
})
