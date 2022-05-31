const knex = require('../database')

class UserService {
    #hashPassword;
    constructor() {
        this.#hashPassword = require("./HashPassword");
    }

    async createUser(usuario) {
        const hashCode = await this.#hashPassword.hashPassword(usuario.senha)

        const [{ identificador }] = await knex('apk.usuario').insert({
            nome: usuario.nome,
            participacao_atletica: usuario.participacao_atletica,
            celular: usuario.celular,
            datadenascimento: new Date(usuario.data_nascimento),
            e_mail: usuario.email,
            senha: hashCode

        }).returning('identificador')

        if (usuario.administrador)
            await knex('apk.organizador').insert({ usuario_id: parseInt(identificador) })

        else
            await knex('apk.universitario').insert({ usuario_id: parseInt(identificador) })

    }

    async authUser(usuario) {
        return await this.#hashPassword.verifyPassword(usuario)
    }

    async favoriteEvent(email, eventId) {

        const [{ identificador }] = await knex('apk.usuario')
                        .select('apk.usuario.identificador')
                        .where({ e_mail: email })

        await knex('apk.favorita').insert({ usuario_id: parseInt(identificador), evento_id: parseInt(eventId) })
    }

    async deleteFavorite(email, eventId) {

        const [{ identificador }] = await knex('apk.usuario')
                        .select('apk.usuario.identificador')
                        .where({ e_mail: email })

        await knex('apk.favorita').where({ usuario_id: parseInt(identificador), evento_id: parseInt(eventId)}).del()
    }

    async getUserByEmail(email) {
        return await knex('apk.usuario').select('identificador', 'nome').where({ e_mail: email });
    }

    async getFavoriteEvents(usuario_id) {
        return await knex('apk.favorita')
            .join('apk.evento', 'apk.favorita.evento_id', 'apk.evento.idevento')
            .select('*').where({ 'apk.favorita.usuario_id': usuario_id })
    }

    async checkFavorite(email, id_evento) {

        const [{ identificador }] = await this.getUserByEmail(email)

        const data = await knex('apk.favorita').where({ usuario_id: identificador, evento_id: id_evento })

        return data.length > 0 ? true : false
    }

}

module.exports = new UserService()
