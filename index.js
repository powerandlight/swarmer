const express = require('express')
const app = express()
const config = require('config')
const debug = require('debug')('swarmer')
const dateformat = require('date-format')

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
  debug('Cache Miss')
  res.send(dateformat('MM/dd/yy at hh:mm:ss'))
})

const server = app.listen(config.get('port'), () => {
  const host = server.address().address
  const port = server.address().port
  debug(`running at http://${host}:${port}' - environment is ${config.get('env')}`)
})
