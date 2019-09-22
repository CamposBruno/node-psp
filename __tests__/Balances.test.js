'use strict'
const supertest = require('supertest')
const app = require('../src/App')

describe('/POST transaction', () => {
  it('should return user balances', async () => {
    const { body: session } = await supertest(app)
      .post('/sessions')
      .set('Accept', 'application/json')
      .send({
        email: 'john@doe.com',
        password: 'pagarme'
      })

    const response = await supertest(app)
      .get('/balances')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${session.token}`)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body).toHaveProperty('available')
    expect(response.body).toHaveProperty('waitingFunds')
  })
})
