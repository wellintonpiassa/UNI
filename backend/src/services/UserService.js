const knex = require('../database')
const { hashPassword, verifyPassword } = require("../services/HashPassword");


module.exports = {
    async createUser(usuario) {

        const hashCode = await hashPassword(usuario.senha)

        await knex('users').insert({
            nome: usuario.nome,
            administrador: usuario.administrador,
            participacao_atletica: usuario.participacao_atletica,
            celular: usuario.celular,
            data_nascimento: usuario.data_nascimento,
            email: usuario.email,
            senha: hashCode,
        })
    }
}