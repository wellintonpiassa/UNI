
module.exports = class Event {

    #nome
    #cidade
    #endereco
    #dataInicio
    #dataFim
    #nTickets
    #emailOrganizador
    #precoIngresso

    constructor(nome, cidade, endereco, dataInicio, dataFim,
        nTickets, emailOrganizador, precoIngresso) {

        this.#nome = nome
        this.#cidade = cidade
        this.#endereco = endereco
        this.#dataInicio = dataInicio
        this.#dataFim = dataFim
        this.#nTickets = nTickets
        this.#emailOrganizador = emailOrganizador
        this.#precoIngresso = precoIngresso
    }


    getNome() {
        return this.#nome
    }

    setNome(nome) {
        this.#nome = nome
    }

    getCidade() {
        return this.#cidade
    }

    setCidade(cidade) {
        this.#cidade = cidade
    }

    getEndereco() {
        return this.#endereco
    }

    setEndereco(endereco) {
        this.#endereco = endereco
    }

    getDataInicio() {
        return this.#dataInicio
    }

    setDataInicio(dataInicio) {
        this.#dataInicio = dataInicio
    }

    getDataFim() {
        return this.#dataFim
    }

    setDataFim(dataFim) {
        this.#dataFim = dataFim
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

    getPrecoIngresso() {
        return this.#precoIngresso
    }

    setPrecoIngresso(precoIngresso) {
        this.#precoIngresso = precoIngresso
    }
}