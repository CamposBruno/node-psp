const NotAuthorized = require('../errors/NotAuthorized')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  try {
    if (!authHeader) throw new NotAuthorized('Bearer token not provided')

    const [, token] = authHeader.split(' ')
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    req.user_id = decoded.id

    next()
  } catch (error) {
    return res.status(401).json({
      error: error.message
    })
  }
}
