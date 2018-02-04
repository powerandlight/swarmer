const express = require('express')
const app = express()
const config = require('config')

app.get('/', (req, res) => {
  res.send('Hi!')
})

const server = app.listen(config.get('port'), () => {
  const host = server.address().address
  const port = server.address().port
  console.log(`running at http://${host}:${port}' - environment is ${config.get('env')}`)
})
