import { body, validationResult } from 'express-validator';

export const validateFavoriteUnit = [
    // Validação do corpo da requisição
    body('id').notEmpty().withMessage('ID do local é obrigatório'),
    body('userId').notEmpty().withMessage('ID do usuário é obrigatório'),
    body('name').notEmpty().withMessage('Nome da unidade é obrigatório'),
    body('address').notEmpty().withMessage('Endereço completo é obrigatório'),
    body('longitude').isFloat().withMessage('Longitude deve ser um número'),
    body('latitude').isFloat().withMessage('Latitude deve ser um número'),
    body('types').isArray({ min: 1 }).withMessage('Types deve ser um array com pelo menos um item'),
    body('addedAt').notEmpty().withMessage('Data de adição é obrigatória'),

    // Campos opcionais não precisam de validação obrigatória

    // Tratamento dos erros
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];