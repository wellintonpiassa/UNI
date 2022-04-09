const knex = require('../database')
const Event = require('../models/Event')

class EventService {
    constructor() {
    }

    async search(filters, page) {

        const max_num_of_events = 10
        const query = knex('apk.evento').select('*')

        if (filters.cidade) {
            query.where({ 'cidade': filters.cidade })
        }

        if (filters['intervalo-data']) {
            query.whereBetween('datainicio', filters['intervalo-data'])
        }

        const eventList = await query.limit(max_num_of_events)
            .offset((page - 1) * max_num_of_events)

        return eventList
    }

    async create(event) {

        const e = new Event(event.nome, event.cidade, event.endereco, event.data_inicio,
            event.data_fim, event.n_tickets, event.email_organizador, event.preco_ingresso,
            event.url_imagem_banner, event.descricao_do_evento
        )

        // verificando se o usuário com o email e existe e se é um organizador
        const r = await knex('apk.organizador')
            .join('apk.usuario', 'apk.usuario.identificador', 'apk.organizador.usuario_id')
            .select('apk.organizador.usuario_id').where({ e_mail: e.getEmailOrganizador() })

        if (r.length == 0) {
            return false
        }

        const [{ usuario_id }] = r // id do organizador

        await knex('apk.evento').insert({
            nome: e.getName(),
            endereco: e.getAddress(),
            cidade: e.getCity(),
            datainicio: e.getStartDate(),
            datafim: e.getEndDate(),
            n_tickets: e.getNTickets(),
            usuario_id: usuario_id,
            preco_ingresso: e.getTicketPrice(),
            url_imagem_banner: e.getUrlImagemBanner(),
            descricao_do_evento: e.getDescricaoDoEvento()
        })

        return true;
    }

}

module.exports = new EventService()