require("dotenv").config({});
const jwt = require('jsonwebtoken');

class JWTAuth {

    constructor() { }

    getJWT(email) {
        const token = jwt.sign({ email },  "" + process.env.SECRET, {
            expiresIn: 86400  // o token expira em 24 horas.
        });

        return token;
    }

    verifyJWT() {

        return [

            (req, res, next) => {

                const token = req.headers['x-access-token'];
                if (!token) return res.status(401).json({ auth: false, message: 'Token não informado.' });

                jwt.verify(token, "" + process.env.SECRET, (err, decoded) => {
                    if (err) return res.status(500).json({ auth: false, message: 'Token inválido.' });

                    req.email = decoded.email;
                    next();
                });
            }
        ]
    }
}

module.exports = new JWTAuth()
