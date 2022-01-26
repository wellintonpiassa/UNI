
class UserController {
    constructor() {
        this.userService = require('../services/UserService')
    }

    async create(req, res, next) {

        try {

            const usuario = req.body

            await this.userService.createUser(usuario)

            return res.status(201).json({ msg: "Usuário criado" }).send()

        } catch (error) {
            next(error)
        }
    }

    async auth(req, res, next) {
        try {
            const usuario = req.body

            const result = await this.userService.authUser(usuario)

            if (result) {
                return res.status(200).json({ auth: true }).send()
            } else {
                return res.status(401).json({ auth: false }).send()
            }

        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()