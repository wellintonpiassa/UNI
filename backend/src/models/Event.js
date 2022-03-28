
module.exports = class Event {

    #name
    #city
    #address
    #startDate
    #endDate
    #nTickets
    #emailOrganizador
    #ticketPrice

    constructor(name, city, address, startDate, endDate,
        nTickets, emailOrganizador, ticketPrice) {

        this.#name = name
        this.#city = city
        this.#address = address
        this.#startDate = startDate
        this.#endDate = endDate
        this.#nTickets = nTickets
        this.#emailOrganizador = emailOrganizador
        this.#ticketPrice = ticketPrice
    }

    getName() {
        return this.#name
    }

    setName(name) {
        this.#name = name
    }

    getCity() {
        return this.#city
    }

    setCity(city) {
        this.#city = city
    }

    getAddress() {
        return this.#address
    }

    setAddress(address) {
        this.#address = address
    }

    getStartDate() {
        return this.#startDate
    }

    setStartDate(startDate) {
        this.#startDate = startDate
    }

    getEndDate() {
        return this.#endDate
    }

    setEndDate(endDate) {
        this.#endDate = endDate
    }

    getNTickets() {
        return this.#nTickets
    }

    setNTickets(nTickets) {
        this.#nTickets = nTickets
    }

    getEmailOrganizador() {
        return this.#emailOrganizador
    }

    setEmailOrganizador(emailOrganizador) {
        this.#emailOrganizador = emailOrganizador
    }

    getTicketPrice() {
        return this.#ticketPrice
    }

    setTicketPrice(ticketPrice) {
        this.#ticketPrice = ticketPrice
    }
}