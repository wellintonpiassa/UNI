const knex = require('../database')
const bcrypt = require('bcrypt');

class HashPassword {

    constructor() { }

    async hashPassword(senha) {

        // generate a random 10 char string (salt);
        const salt = await bcrypt.genSalt(10);

        // hash the password, this can not be reversed
        const hashCode = await bcrypt.hash(senha, salt);

        return hashCode

    }

    async verifyPassword(usuario) {

        // get the user based on their email
        const data = await knex('users').select('senha').where({ email: usuario.email });
        if (data.length <= 0)
            return false

        // use bcrypt to hash the password and compared it to our stored hash
        return await bcrypt.compare(usuario.senha, data[0].senha);
    }
}

module.exports = new HashPassword()