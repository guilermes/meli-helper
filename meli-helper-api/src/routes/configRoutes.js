const express = require("express")
const router = express.Router()

const controller =
  require("../controllers/configController")

const authMiddleware =
  require("../middlewares/authMiddleware")

////////////////////////////////////////////////////////////

/**
 * @swagger
 * tags:
 *   name: Configuração
 *   description: Regras de precificação do sistema
 */

////////////////////////////////////////////////////////////

/**
 * @swagger
 * /config:
 *   get:
 *     summary: Retorna a configuração do usuário logado
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
 *                 imposto:
 *                   type: number
 *                   example: 8
 *
 *                 custoOperacional:
 *                   type: number
 *                   example: 5
 *
 *                 userId:
 *                   type: integer
 *                   example: 1
 *
 *       401:
 *         description: Token inválido ou não enviado
 */

// 🔒 ROTA PROTEGIDA
router.get(
  "/",
  authMiddleware,
  controller.obterConfiguracao
)

////////////////////////////////////////////////////////////

/**
 * @swagger
 * /config:
 *   post:
 *     summary: Salva a configuração do usuário logado
 *     tags: [Configuração]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             properties:
 *
 *               imposto:
 *                 type: number
 *                 example: 8
 *
 *               custoOperacional:
 *                 type: number
 *                 example: 5
 *
 *     responses:
 *       200:
 *         description: Configuração salva
 *
 *       401:
 *         description: Token inválido ou não enviado
 */

// 🔒 ROTA PROTEGIDA
router.post(
  "/set",
  authMiddleware,
  controller.atualizarConfiguracao
)

////////////////////////////////////////////////////////////

module.exports = router