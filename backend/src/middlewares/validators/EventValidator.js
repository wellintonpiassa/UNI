const { check, validationResult } = require('express-validator');

class EventValidator {
    constructor() {
    }

    getEventValidator() {
        return [

            check('nome')
                .notEmpty()
                .withMessage("Campo 'Nome' é obrigatório"),

            check('cidade')
                .notEmpty()
                .withMessage("Campo 'Cidade' é obrigatório"),

            check('endereco')
                .notEmpty()
                .withMessage("Campo 'Endereço' é obrigatório"),

            check('data_inicio')
                .notEmpty()
                .withMessage("Campo 'Data de início do evento' é obrigatório")
                .isISO8601()
                .withMessage("Formato de data inválido"),

            check('data_fim')
                .notEmpty()
                .withMessage("Campo 'Data de fim do evento' é obrigatório")
                .isISO8601()
                .withMessage("Formato de data inválido")
                .custom((value, { req }) => {
                    let date = new Date(value)
                    let date_inicio = new Date(req.body.data_inicio)

                    if (date < date_inicio)
                        return Promise.reject('Data de fim do evento não deve ser anterior à data de início')

                    return true
                }),

            check('n_tickets')
                .notEmpty()
                .withMessage("Campo 'Número de tickets' é obrigatório")
                .isInt({ min: 1 })
                .withMessage("Campo 'Número de tickets' deve ser um numero inteiro maior do que 0"),

            check('email_organizador')
                .notEmpty()
                .withMessage("Campo 'Email do organizador' é obrigatório")
                .isEmail()
                .withMessage("Email inválido"),

            check('preco_ingresso')
                .notEmpty()
                .withMessage("Campo 'Preço do ingresso' é obrigatório")
                .matches(/^(\d{1,3}(\.\d{3})*|\d+)(\.\d{2})?$/)
                .withMessage("Formato de preço inválido")
                .custom(value => {
                    let p = value.replace('.', '')
                    let r = p.split('').every(char => char === '0')

                    if (r === true)
                        return Promise.reject('Preço do ingresso deve ser maior do que 0')

                    return true
                }),

            check('url_imagem_banner')
                .notEmpty()
                .withMessage("Campo 'Url_imagem_banner' é obrigatório")
                .isLength({ max: 100 })
                .withMessage("Campo 'Url_imagem_banner' deve ter até 100 caracteres"),

            check('descricao_do_evento')
                .notEmpty()
                .withMessage("Campo 'Descrição do evento' é obrigatório")
                .isLength({ max: 100 })
                .withMessage("Campo 'Descrição do evento' deve ter até 100 caracteres"),

            (req, res, next) => {

                const errors = validationResult(req);
                if (!errors.isEmpty())
                    return res.status(422).json({ errors: errors.array() });
                next();
            },
        ]
    }

}

module.exports = new EventValidator();