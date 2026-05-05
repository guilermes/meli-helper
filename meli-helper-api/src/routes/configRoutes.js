const express = require("express")
const router = express.Router()
const controller = require("../controllers/configController")

/**
 * @swagger
 * tags:
 *   name: Configuração
 *   description: Regras de precificação do sistema
 */

/**
 * @swagger
 * /config:
 *   get:
 *     summary: Retorna a configuração atual de precificação
 *     tags: [Configuração]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Configuração atual
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comissao:
 *                   type: number
 *                   example: 12
 *                 imposto:
 *                   type: number
 *                   example: 8
 *                 custoOperacional:
 *                   type: number
 *                   example: 5
 */
router.get("/", controller.get)

/**
 * @swagger
 * /config:
 *   post:
 *     summary: Define ou atualiza a configuração de precificação
 *     tags: [Configuração]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comissao:
 *                 type: number
 *                 example: 12
 *               imposto:
 *                 type: number
 *                 example: 8
 *               custoOperacional:
 *                 type: number
 *                 example: 5
 *     responses:
 *       200:
 *         description: Configuração salva com sucesso
 */
router.post("/", controller.set)

module.exports = router