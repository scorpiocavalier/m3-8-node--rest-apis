const { v4: uuidv4 } = require('uuid');
const { clients } = require('../data/clients');

const handleRoot = (req, res) => {
  res.status(200).send('root')
}

const handleClients_Get = (req, res) => {
  res.status(200).json(clients)
}

const handleClient_Get = (req, res) => {
  const { id } = req.params
  client = clients.filter(client => id === client.id)
  res.status(200).json(client)
}

const handleClient_Post = (req, res) => {
  const { email } = req.body
  let alreadyExists = clients.some(client => email === client.email)
  if(!alreadyExists) {
    const id = uuidv4()
    res.status(201).json({ id, ...req.body })
  } else {
    res.status(304).send("A user with this email already exists.")
  }
}

const handleClient_Delete = (req, res) => {
  const { id } = req.params
  const index = clients.indexOf(client => id === client.id)
  clients.splice(index, 1)
  res.status(200).json(clients)
}

module.exports = {
  handleRoot,
  handleClients_Get, handleClient_Get,
  handleClient_Post, handleClient_Delete
}