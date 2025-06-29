import { body, validationResult } from 'express-validator';

export const validateFavoriteUnit = [
    // Validação do corpo da requisição
    body('userId').notEmpty().withMessage('ID do usuário é obrigatório'),
    body('name').notEmpty().withMessage('Nome da unidade é obrigatório'),
    body('address.logradouro').notEmpty().withMessage('Logradouro é obrigatório'),
    body('address.numero').notEmpty().withMessage('Número é obrigatório'),
    body('address.bairro').notEmpty().withMessage('Bairro é obrigatório'),
    body('address.cep').notEmpty().withMessage('CEP é obrigatório'),
    body('address.estado').notEmpty().withMessage('Estado é obrigatório'),
    body('longitude').isFloat().withMessage('Longitude deve ser um número'),
    body('latitude').isFloat().withMessage('Latitude deve ser um número'),

    // Tratamento dos erros
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];