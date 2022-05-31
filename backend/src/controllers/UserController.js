
class UserController {
    static #userService = require('../services/UserService')
    static #jwtAuth = require('../middlewares/JWTAuth')

    constructor() {
    }

    async create(req, res, next) {

        try {
            const usuario = req.body
            await UserController.#userService.createUser(usuario)

            const jwt = await UserController.#jwtAuth.getJWT(usuario.email)

            return res.status(201).json({ msg: "Usuário criado", jwt: jwt }).send()

        } catch (error) {
            next(error)
        }
    }

    async auth(req, res, next) {
        try {
            const usuario = req.body
            const result = await UserController.#userService.authUser(usuario)

            const jwt = await UserController.#jwtAuth.getJWT(usuario.email)

            if (result) {
                return res.status(200).json({ auth: true, jwt: jwt }).send()
            } else {
                return res.status(401).json({ auth: false }).send()
            }

        } catch (error) {
            next(error)
        }
    }

    async favorite(req, res, next) {
        try {
            const email = req.email
            const eventoId = req.body.evento_id
            console.log(eventoId)

            await UserController.#userService.favoriteEvent(email, eventoId)

            const jwt = await UserController.#jwtAuth.getJWT(email)

            return res.status(201).json({ msg: "Evento favoritado.", jwt: jwt }).send()

        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()