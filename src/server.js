'use strict'
const app = require('./App')

app.listen(process.env.PORT, () => {
  console.log(`App online on ${process.env.PORT}`)
})
