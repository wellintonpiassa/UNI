const express = require('express')

class Routes {
    constructor(){
        this.routes = express.Router()
        this.userController = require('../controllers/UserController')
        this.userValidator = require('../validators/UserValidator')
        this.configure()
    }

    #configure(){
        this.routes
                .post('/cadastro', this.userValidator.getCreateUserValidator(), this.userController.create)
                .post('/login', this.userValidator.getLoginValidator(), this.userController.auth)
    }
    
    getRoutes(){
        return this.routes
    }
}

module.exports = new Routes()