const express = require('express')

class Routes {
    #routes;
    #userController;
    #eventController;
    #eventValidator;
    #userValidator;
    #jwtAuth;
    constructor() {
        this.#routes = express.Router()
        this.#userController = require('../controllers/UserController')
        this.#eventController = require('../controllers/EventController')
        this.#userValidator = require('../middlewares/validators/UserValidator')
        this.#eventValidator = require('../middlewares/validators/EventValidator')
        this.#jwtAuth = require('../middlewares/JWTAuth')
        this.configure()
    }

    configure() {
        this.#routes
            .post('/cadastro', this.#userValidator.getCreateUserValidator(), this.#userController.create)
            .post('/login', this.#userValidator.getLoginValidator(), this.#userController.auth)
            .get('/evento', this.#jwtAuth.verifyJWT(), this.#eventController.searchForEvents)
            .post('/evento', this.#jwtAuth.verifyJWT(), this.#eventValidator.getEventValidator(),
                this.#eventController.create)
    }

    getRoutes() {
        return this.#routes
    }
}

module.exports = new Routes()