const express = require("express")
const router = express.Router()
const controller = require("../controllers/userController")

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints de usuários
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Usuários]
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
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Erro ao cadastrar usuário
 */
router.post("/register", controller.register)

module.exports = router