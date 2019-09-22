'use strict'
const supertest = require('supertest')
const app = require('../src/App')

describe('/POST Sessions', () => {
  it('should return return a JWT token', async () => {
    const response = await supertest(app)
      .post('/sessions')
      .set('Accept', 'application/json')
      .send({
        email: 'john@doe.com',
        password: 'pagarme'
      })
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body).toHaveProperty('token')
  })

  it('should return 400 when email not provided', async () => {
    const response = await supertest(app)
      .post('/sessions')
      .set('Accept', 'application/json')
      .send({
        password: 'pagarme'
      })
      .expect(400)
      .expect('Content-Type', /json/)

    expect(response.body).toHaveProperty('error')
  })

  it('should return 400 when password not provided', async () => {
    const response = await supertest(app)
      .post('/sessions')
      .set('Accept', 'application/json')
      .send({
        email: 'john@doe.com'
      })
      .expect(400)
      .expect('Content-Type', /json/)

    expect(response.body).toHaveProperty('error')
  })

  it('should return 400 when user not found', async () => {
    const response = await supertest(app)
      .post('/sessions')
      .set('Accept', 'application/json')
      .send({
        email: 'notfound123@doe.com',
        password: 'pagarme'
      })
      .expect(401)
      .expect('Content-Type', /json/)

    expect(response.body).toHaveProperty('error')
  })

  it('should return 400 when password mismatch', async () => {
    const response = await supertest(app)
      .post('/sessions')
      .set('Accept', 'application/json')
      .send({
        email: 'john@doe.com',
        password: 'wrongpassword'
      })
      .expect(401)
      .expect('Content-Type', /json/)

    expect(response.body).toHaveProperty('error')
  })
})
