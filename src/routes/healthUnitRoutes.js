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
 *               - userId
 *               - name
 *               - address
 *               - longitude
 *               - latitude
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID do usuário
 *               name:
 *                 type: string
 *                 description: Nome da unidade de saúde
 *               address:
 *                 type: object
 *                 properties:
 *                   logradouro:
 *                     type: string
 *                   numero:
 *                     type: string
 *                   bairro:
 *                     type: string
 *                   cep:
 *                     type: string
 *                   estado:
 *                     type: string
 *               longitude:
 *                 type: number
 *                 format: float
 *               latitude:
 *                 type: number
 *                 format: float
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