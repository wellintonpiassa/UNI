const express = require('express')

class Server {
    
    constructor(port) {
        this.port = port
        this.server = express()
        this.routes = require('./routes')
        this.configure()
    }
    
    #configure(){
        this.server.use(express.json())
        this.server.use(this.routes.getRoutes())

        // notFound -> para rotas inválidas
        this.server.use((req, res, next) => {
            const error = new Error('Not found')
            error.status = 404
            next(error)
        })

        // catch all
        this.server.use((error, req, res, next) => {
            res.status(error.status || 500)
            res.json({ error: error.message })
        })
    }    
    
    listen() {
        this.server.listen(this.port, () => console.log('Server is running'))
    }
}

let server = new Server(3333)
server.listen()