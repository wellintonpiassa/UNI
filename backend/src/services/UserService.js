const knex = require('../database')

class UserService {

    constructor() {
        this.hashPassword = require("./HashPassword");
    }

    async createUser(usuario) {
        const hashCode = await this.hashPassword.hashPassword(usuario.senha)

        const [{ identificador }] = await knex('apk.usuario').insert({
            nome: usuario.nome,
            administrador: usuario.administrador,
            participacao_atletica: usuario.participacao_atletica,
            celular: usuario.celular,
            datadenascimento: usuario.data_nascimento,
            e_mail: usuario.email,
            senha: hashCode

        }).returning('identificador')

        if (usuario.administrador == true)
            await knex('apk.organizador').insert({ usuario_id: parseInt(identificador) })

        else
            await knex('apk.universitario').insert({ usuario_id: parseInt(identificador) })

    }

    async authUser(usuario) {
        return await this.hashPassword.verifyPassword(usuario)
    }
}

module.exports = new UserService()