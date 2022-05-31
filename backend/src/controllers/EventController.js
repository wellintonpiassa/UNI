
class EventController {
    static #eventService = require('../services/EventService')
    static #userService = require('../services/UserService')

    constructor() {
    }

    async searchForEvents(req, res, next) {
        try {

            const filters = {}
            if (parseInt(req.query.proximos30d, 10)) {
                let startDate = new Date()
                let endDate = new Date(startDate.valueOf())
                endDate.setDate(startDate.getDate() + 30)
                filters['intervalo-data'] = [startDate, endDate]
            }
            if (req.query.cidade) {
                filters['cidade'] = req.query.cidade
            }

            let page
            if (req.query.pagina) {
                page = req.query.pagina
            } else {
                page = 1
            }

            const eventList = await EventController.#eventService.search(filters, page, req.email)

            const promises = [];

            eventList.forEach((event) => {
                const promise = new Promise((resolve, reject) => {
                    EventController.#userService.checkFavorite(req.email, event.idevento)
                        .then(favorito => {
                            event.favorito = favorito
                            resolve(event)
                        })
                        .catch(e => {
                            reject(e)
                        })
                })

                promises.push(promise)
            });

            await Promise.all(promises).then(r => r).catch(error => { throw error })

            return res.status(200).json({ eventList }).send()

        } catch (error) {
            next(error)
        }
    }

    async createEvent(req, res, next) {
        try {

            const e = req.body
            const result = await EventController.#eventService.create(e, req.email)

            if (result)
                return res.status(200).json({ created: true }).send()
            else
                return res.status(403).json({
                    created: false,
                    msg: "O e-mail informado não pertence a um organizador"
                }).send()

        } catch (error) {
            next(error)
        }
    }
}

module.exports = new EventController()