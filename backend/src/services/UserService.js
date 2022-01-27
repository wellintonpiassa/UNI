const knex = require('../database')

class UserService {

    constructor() {
        this.hashPassword = require("./HashPassword");
    }

    async createUser(usuario) {
        const hashCode = await this.hashPassword.hashPassword(usuario.senha)

        // await knex('users').insert({
        //     nome: usuario.nome,
        //     administrador: usuario.administrador,
        //     participacao_atletica: usuario.participacao_atletica,
        //     celular: usuario.celular,
        //     data_nascimento: usuario.data_nascimento,
        //     email: usuario.email,
        //     senha: hashCode,
        // })
    }

    async authUser(usuario) {
        return await this.hashPassword.verifyPassword(usuario)
    }
}

module.exports = new UserService()