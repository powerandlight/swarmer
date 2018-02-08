const express = require('express')
const app = express()
const config = require('config')
const debug = require('debug')('swarmer')

app.get('/', (req, res) => {
  res.send('Hi!')
})
app.get('/healthcheck', (req, res) => {
  res.send(200)
})

const server = app.listen(config.get('port'), () => {
  console.info(`Running on NODE_ENV=${process.env.NODE_ENV} DEBUG=${process.env.DEBUG} REDIS_HOST=${process.env.REDIS_HOST} REDIS_PORT=${process.env.REDIS_PORT}`)
  const host = server.address().address
  const port = server.address().port
  debug(`running at http://${host}:${port}' - environment is ${config.get('env')}`)
})
