'use strict'
const supertest = require('supertest')
const app = require('../src/App')

describe('/POST transaction', () => {
  it('should create a User', async () => {
    const response = await supertest(app)
      .post('/users')
      .set('Accept', 'application/json')
      .send({
        name: 'John Doe 2',
        email: 'john2@doe.com',
        password: 'password2'
      })
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body).toHaveProperty('id')
  })

  it('should return 400 if user alrey exists', async () => {
    const response = await supertest(app)
      .post('/users')
      .set('Accept', 'application/json')
      .send({
        name: 'John Doe 2',
        email: 'john2@doe.com',
        password: 'password2'
      })
      .expect(400)
      .expect('Content-Type', /json/)

    expect(response.body).toHaveProperty('error')
  })

  it('should return 400 when name not present', async () => {
    const response = await supertest(app)
      .post('/users')
      .set('Accept', 'application/json')
      .send({
        email: 'john@doe.com',
        password: 'password'
      })
      .expect(400)
      .expect('Content-Type', /json/)

    expect(response.body).toHaveProperty('error')
  })

  it('should return 400 when email not present', async () => {
    const response = await supertest(app)
      .post('/users')
      .set('Accept', 'application/json')
      .send({
        name: 'John Doe',
        password: 'password'
      })
      .expect(400)
      .expect('Content-Type', /json/)

    expect(response.body).toHaveProperty('error')
  })

  it('should return 400 when password not present', async () => {
    const response = await supertest(app)
      .post('/users')
      .set('Accept', 'application/json')
      .send({
        email: 'john@doe.com',
        name: 'John Doe'
      })
      .expect(400)
      .expect('Content-Type', /json/)

    expect(response.body).toHaveProperty('error')
  })
})
