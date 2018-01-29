const express = require('express')
const cors = require('cors')
const errorhandler = require('http-errors-middleware')
const bodyParser = require('body-parser')
const app = express()
const config = require('config')

const redisDebug = require('debug')('server:redis')
// Use our docker compose redis cache. Remove the config settings to use local redis
const cache = require('express-redis-cache')({
  host: config.get('db.redis.host'),
  port: config.get('db.redis.port'),
  expire: 60
})
cache.on('error', e => {
  redisDebug(`Cache error ${e.message}`)
})
cache.on('connected', e => {
  redisDebug(`Redis cache connected to ${config.get('db.redis.host')}:${config.get('db.redis.port')} ${e}`)
})

const mongooseDebug = require('debug')('server:mongoose')
const mongoose = require('mongoose')
mongoose.Promise = Promise
mongoose.connect(config.get('db.mongodb.uri'))
mongoose.connection.on('error', (e) => mongooseDebug(`mongoose connection error: ${e}`))
mongoose.connection.once('open', () => mongooseDebug(`mongoose connected to ${config.get('db.mongodb.uri')}`))

if (config.get('env') === 'development') {
  app.use(errorhandler({debug: true}))
}
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Mounts our api at /api (/api/todo)
app.use('/api', require('./api/controllers'))

app.use('/cached', cache.route(), (req,res) => {
  redisDebug('Cache miss')
  res.send(new Date())
})

app.get('/', (req, res) => {
  res.send('Hi!')
})

app.use((req, res) => {
  res.status(404).send(`Can't find that page, try something else!`)
})

const server = app.listen(config.get('port'), () => {
  const host = server.address().address
  const port = server.address().port
  console.log(`running at http://${host}:${port}' - environment is ${config.get('env')}`)
})
