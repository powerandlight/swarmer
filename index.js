const express = require('express')
const app = express()
const config = require('config')
const debug = require('debug')('swarmer')
const dateformat = require('date-format')
const os = require('os')

app.get('/', (req, res) => {
  res.send('Hi!')
})
const cache = require('express-redis-cache')({
  host: config.get('db.redis.host'),
  port: config.get('db.redis.port'),
  expire: 60
})
cache.on('error', e => {
  debug(`Cache error ${e.message}`)
})
cache.on('connected', e => {
  debug(`Redis cache connected to ${config.get('db.redis.host')}:${config.get('db.redis.port')} ${e}`)
})

app.use('/cached', cache.route(), (req, res) => {
  res.send(`<h1>Hi there!</h1>Date: ${dateformat('MM/dd/yy at hh:mm:ss')} <br />Hostname: ${os.hostname()}`)
})

const server = app.listen(config.get('port'), () => {
  console.info(`Running on NODE_ENV=${process.env.NODE_ENV} DEBUG=${process.env.DEBUG} REDIS_HOST=${process.env.REDIS_HOST} REDIS_PORT=${process.env.REDIS_PORT}`)
  const host = server.address().address
  const port = server.address().port
  debug(`running at http://${host}:${port}' - environment is ${config.get('env')}`)
})
