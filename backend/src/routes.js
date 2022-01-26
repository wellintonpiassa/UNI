const express = require('express')
const routes = express.Router()

const userController = require('./controllers/UserController')

const { createUser, authUser } = require('./validators/UserValidator')

routes
    .post('/cadastro', createUser, userController.create)
    .post('/login', authUser, userController.auth)


module.exports = routes