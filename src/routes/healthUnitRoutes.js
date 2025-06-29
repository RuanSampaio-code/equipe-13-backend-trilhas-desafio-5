import express from "express";
import HealthUnitController from "../controllers/healthUnitController.js";
import { validateFavoriteUnit } from "../middlewares/validateHealthUnit.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Unidades Favoritas
 *   description: Gerenciamento de unidades de saúde favoritas
 */

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Adiciona uma unidade de saúde aos favoritos
 *     tags: [Unidades Favoritas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - userId
 *               - name
 *               - address
 *               - longitude
 *               - latitude
 *               - types
 *               - addedAt
 *             properties:
 *               id:
 *                 type: string
 *                 description: "ID do local (ex: do Google Places)"

 *                 example: "ChIJN1t_tDeuEmsRUsoyG83frY4"
 *               userId:
 *                 type: string
 *                 description: ID do usuário
 *                 example: "abc123"
 *               name:
 *                 type: string
 *                 description: Nome do estabelecimento
 *                 example: "Hospital Central"
 *               address:
 *                 type: string
 *                 description: Endereço completo
 *                 example: "Rua Exemplo, 123, Centro, São Paulo - SP"
 *               latitude:
 *                 type: number
 *                 format: float
 *                 example: -23.55052
 *               longitude:
 *                 type: number
 *                 format: float
 *                 example: -46.633308
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: Avaliação (opcional)
 *                 example: 4.5
 *               phoneNumber:
 *                 type: string
 *                 description: Número de telefone com DDD (opcional)
 *                 example: "(11) 1234-5678"
 *               website:
 *                 type: string
 *                 description: URL do site oficial (opcional)
 *                 example: "https://www.hospitalcentral.com"
 *               types:
 *                 type: array
 *                 description: Lista de categorias
 *                 items:
 *                   type: string
 *                 example: ["hospital", "health"]
 *               addedAt:
 *                 type: string
 *                 format: date-time
 *                 description: Data e hora em que foi adicionado (ISODate)
 *                 example: "2024-06-29T18:00:00.000Z"
 *     responses:
 *       201:
 *         description: Unidade favorita cadastrada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/favorites", validateFavoriteUnit, HealthUnitController.addFavorite);

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Lista todas as unidades favoritas por id de usuario
 *     tags: [Unidades Favoritas]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filtra por ID de usuário
 *     responses:
 *       200:
 *         description: Lista de unidades favoritas
 */
router.get("/favorites", HealthUnitController.getFavorites);


/**
 * @swagger
 * /favorites/{id}:
 *   delete:
 *     summary: Remove uma unidade de saúde dos favoritos
 *     tags: [Unidades Favoritas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da unidade favorita a ser removida
 *     responses:
 *       200:
 *         description: Unidade favorita removida com sucesso
 *       404:
 *         description: Unidade favorita não encontrada
 */
router.delete("/favorites/:id", HealthUnitController.deleteFavorite);



/**
 * @swagger
 * /health-units:
 *   get:
 *     summary: Lista todas as unidades de saúde
 *     tags: [Unidades de Saúde]
 *     responses:
 *       200:
 *         description: Lista de unidades de saúde
 */
router.get("/health-units", HealthUnitController.getHealthUnits);



export default router;