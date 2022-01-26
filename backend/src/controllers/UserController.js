const { createUser } = require('../services/UserService')

module.exports = {

    async create(req, res, next) {
        try {
            const usuario = req.body

            await createUser(usuario, next)

            return res.status(201).json({ msg: "Usuário criado" }).send()

        } catch (error) {
            next(error)
        }
    }
}