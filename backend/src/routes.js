const express = require('express')
const routes = express.Router()

const userController = require('./controllers/UserController')

const { createUser, authUser } = require('./validators/UserValidator')

routes
    // Users
    .post('/users', createUser, userController.create)


module.exports = routes