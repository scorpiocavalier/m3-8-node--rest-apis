'use strict'

const express       = require('express')
const bodyParser    = require('body-parser')
const morgan        = require('morgan')
const {
  handleRoot,
  handleClients_Get, handleClient_Get,
  handleClient_Post, handleClient_Delete
}                   = require('./handlers/clientHandlers')

express()
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })
  .use(morgan('tiny'))
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  .get('/', handleRoot)
  .get('/clients', handleClients_Get)
  .get('/clients/:id', handleClient_Get)
  .post('/clients', handleClient_Post)
  .delete('/clients/:id', handleClient_Delete)

  .listen(8000, () => console.log(`Listening on port 8000`))
