const express = require("express")
const router = express.Router()
const controller = require("../controllers/authController")

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação e login
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login e retorna um token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", controller.login)

module.exports = router