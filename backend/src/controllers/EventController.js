
class EventController {
    static #eventService = require('../services/EventService')

    constructor() {
    }

    async searchForEvents(req, res, next){
        try {
            
            const filters = {}
            if(parseInt(req.query.proximos30d, 10)){
                let startDate = new Date()
                let endDate = new Date(startDate.valueOf())
                endDate.setDate(startDate.getDate() + 30)
                filters['intervalo-data'] = [startDate, endDate]
            }
            if(req.query.cidade){
                filters['cidade'] = req.query.cidade
            }
            
            let page
            if (req.query.pagina){
                page = req.query.pagina
            }else{
                page = 1
            }

            const eventList = await EventController.#eventService.search(filters, page)
            return res.status(200).json({ eventList }).send()

        } catch (error) {
            next(error)
        }
    }
}

module.exports = new EventController()