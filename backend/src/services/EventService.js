const knex = require('../database')

class EventService {
    constructor() {
    }

    async search(filters, page) {

        const max_num_of_events = 10
        const query = knex('apk.evento').select('*')

        if (filters.cidade){
            query.where({'cidade': filters.cidade})
        }

        if (filters['intervalo-data']){
            query.whereBetween('datainicio', filters['intervalo-data'])
        }

        const eventList = await query.limit(max_num_of_events)
                                     .offset((page-1)*max_num_of_events)

        return eventList
    }

}

module.exports = new EventService()