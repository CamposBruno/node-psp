'use strict'
const supertest = require('supertest')
const app = require('../src/App')
const Helper = require('../src/utils/helper')

describe('/POST transaction', () => {
  const transactionData = {
    amount: 315.76,
    description: 'Smartband XYZ 3.0',
    payment_method: 'debit_card',
    card_number: '4080334576766201',
    card_holder: 'John Doe',
    expires_at: '2019-09-01',
    cvv: '768'
  }

  it('should return create a Transaction', async () => {
    const { body: session } = await supertest(app)
      .post('/sessions')
      .set('Accept', 'application/json')
      .send({
        email: 'john@doe.com',
        password: 'pagarme'
      })

    const response = await supertest(app)
      .post('/transaction')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${session.token}`)
      .send(transactionData)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body).toHaveProperty('id')
  })

  it('should return 400 when amount not present', async () => {
    const { body: session } = await supertest(app)
      .post('/sessions')
      .set('Accept', 'application/json')
      .send({
        email: 'john@doe.com',
        password: 'pagarme'
      })

    const response = await supertest(app)
      .post('/transaction')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        amount: 315.76,
        payment_method: 'debit_card',
        card_number: '4080334576766201',
        card_holder: 'John Doe',
        expires_at: '2019-09-01',
        cvv: '768'
      })
      .expect(400)
      .expect('Content-Type', /json/)

    expect(response.body).toHaveProperty('error')
  })

  it('should return 400 when description not present', async () => {
    const { body: session } = await supertest(app)
      .post('/sessions')
      .set('Accept', 'application/json')
      .send({
        email: 'john@doe.com',
        password: 'pagarme'
      })

    const response = await supertest(app)
      .post('/transaction')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        amount: 315.76,
        description: 'Smartband XYZ 3.0',
        card_number: '4080334576766201',
        card_holder: 'John Doe',
        expires_at: '2019-09-01',
        cvv: '768'
      })
      .expect(400)
      .expect('Content-Type', /json/)

    expect(response.body).toHaveProperty('error')
  })

  it('should return 400 when payment_method not present', async () => {
    const { body: session } = await supertest(app)
      .post('/sessions')
      .set('Accept', 'application/json')
      .send({
        email: 'john@doe.com',
        password: 'pagarme'
      })

    const response = await supertest(app)
      .post('/transaction')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        amount: 315.76,
        description: 'Smartband XYZ 3.0',
        payment_method: 'debit_card',
        card_holder: 'John Doe',
        expires_at: '2019-09-01',
        cvv: '768'
      })
      .expect(400)
      .expect('Content-Type', /json/)

    expect(response.body).toHaveProperty('error')
  })

  it('should return 400 when card_number not present', async () => {
    const { body: session } = await supertest(app)
      .post('/sessions')
      .set('Accept', 'application/json')
      .send({
        email: 'john@doe.com',
        password: 'pagarme'
      })

    const response = await supertest(app)
      .post('/transaction')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        amount: 315.76,
        description: 'Smartband XYZ 3.0',
        payment_method: 'debit_card',
        card_number: '4080334576766201',
        expires_at: '2019-09-01',
        cvv: '768'
      })
      .expect(400)
      .expect('Content-Type', /json/)

    expect(response.body).toHaveProperty('error')
  })

  it('should return 400 when card_holder not present', async () => {
    const { body: session } = await supertest(app)
      .post('/sessions')
      .set('Accept', 'application/json')
      .send({
        email: 'john@doe.com',
        password: 'pagarme'
      })

    const response = await supertest(app)
      .post('/transaction')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        amount: 315.76,
        description: 'Smartband XYZ 3.0',
        payment_method: 'debit_card',
        card_number: '4080334576766201',
        card_holder: 'John Doe',
        cvv: '768'
      })
      .expect(400)
      .expect('Content-Type', /json/)

    expect(response.body).toHaveProperty('error')
  })

  it('should return 400 when expires_at not present', async () => {
    const { body: session } = await supertest(app)
      .post('/sessions')
      .set('Accept', 'application/json')
      .send({
        email: 'john@doe.com',
        password: 'pagarme'
      })

    const response = await supertest(app)
      .post('/transaction')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        cvv: '768'
      })
      .expect(400)
      .expect('Content-Type', /json/)

    expect(response.body).toHaveProperty('error')
  })

  it('should return 400 when expires_at not present', async () => {
    const { body: session } = await supertest(app)
      .post('/sessions')
      .set('Accept', 'application/json')
      .send({
        email: 'john@doe.com',
        password: 'pagarme'
      })

    const response = await supertest(app)
      .post('/transaction')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        amount: 315.76,
        description: 'Smartband XYZ 3.0',
        payment_method: 'debit_card',
        card_number: '4080334576766201',
        card_holder: 'John Doe',
        expires_at: '2019-09-01'
      })
      .expect(400)
      .expect('Content-Type', /json/)

    expect(response.body).toHaveProperty('error')
  })
})

describe('/GET transactions', () => {
  it('Should list transactions', async () => {
    const { body: session } = await supertest(app)
      .post('/sessions')
      .set('Accept', 'application/json')
      .send({
        email: 'john@doe.com',
        password: 'pagarme'
      })

    const response = await supertest(app)
      .get('/transactions')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${session.token}`)
      .expect(200)
      .expect('Content-Type', /json/)

    if (response.body.length) {
      for (const transaction of response.body) {
        expect(transaction.card_number).toBe(Helper.hideCardNumber(transaction.card_number))
      }
    }
  })
})
