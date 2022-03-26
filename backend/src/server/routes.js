const express = require('express')

class Routes {
    #routes;
    #userController;
    #eventController;
    #userValidator;
    #jwtAuth;
    constructor() {
        this.#routes = express.Router()
        this.#userController = require('../controllers/UserController')
        this.#eventController = require('../controllers/EventController')
        this.#userValidator = require('../middlewares/validators/UserValidator')
        this.#jwtAuth = require('../middlewares/JWTAuth')
        this.configure()
    }

    configure() {
        this.#routes
            .post('/cadastro', this.#userValidator.getCreateUserValidator(), this.#userController.create)
            .post('/login', this.#userValidator.getLoginValidator(), this.#userController.auth)
            .get('/evento', this.#jwtAuth.verifyJWT(), this.#eventController.searchForEvents)
    }

    getRoutes() {
        return this.#routes
    }
}

module.exports = new Routes()