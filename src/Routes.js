const { Router } = require('express')
const TransactionController = require('./controllers/Transactions')
const SessionController = require('./controllers/Session')
const UsersController = require('./controllers/Users')
const BalancesController = require('./controllers/Balances')
const AuthMiddleware = require('./middlewares/auth')

const routes = new Router()

routes.post('/sessions', SessionController.validateStore, SessionController.store)
routes.post('/users', UsersController.validateStore, UsersController.store)

routes.use(AuthMiddleware)

routes.get('/transactions', TransactionController.index)
routes.post('/transaction', TransactionController.validateStore, TransactionController.store)
routes.get('/balances', BalancesController.index)

module.exports = routes
