const { check, validationResult } = require('express-validator');

exports.createUser = [

    check('nome')
        .notEmpty()
        .withMessage("Campo 'Nome' é obrigatório"),

    check('administrador')
        .notEmpty()
        .withMessage("Campo 'Administrador' é obrigatório"),

    check('participacao_atletica')
        .notEmpty()
        .withMessage("Campo 'Participação em atlética' é obrigatório"),

    check('celular')
        .notEmpty()
        .withMessage("Campo 'Celular' é obrigatório"),

    check('data_nascimento')
        .notEmpty()
        .withMessage("Campo 'Data de nascimento' é obrigatório")
        .isDate({ format: 'DD-MM-YYYY' })
        .withMessage("Formato de data inválido"),

    check('email')
        .notEmpty()
        .withMessage("Campo 'Email' é obrigatório")
        .isEmail()
        .withMessage("Email inválido"),

    check('senha')
        .notEmpty()
        .withMessage("Campo 'Senha' é obrigatório")
        .isLength({ min: 5 })
        .withMessage("A senha precisa ter no mínimo 5 caracteres"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];

exports.authUser = []