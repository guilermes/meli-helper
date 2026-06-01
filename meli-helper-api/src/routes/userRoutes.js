const express = require("express")
const router = express.Router()
const controller = require("../controllers/userController")
const authMiddleware = require("../middlewares/authMiddleware")

// Rotas protegidas por autenticação
router.use(authMiddleware)

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

/**
 * @swagger
 * /users/perfil:
 *   get:
 *     summary: Obtém as informações do perfil do usuário
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Informações do perfil obtidas com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.get("/profile", authMiddleware, controller.getProfile)

/**
 * @swagger
 * /users/atualizar-perfil:
 *   put:
 *     summary: Atualiza as informações do perfil do usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João da Silva
 *               nomeLoja:
 *                 type: string
 *                 example: Loja do João
 *               avatar:
 *                 type: string
 *                 example: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHyg4v0DsGHQAAAABJRU5ErkJggg==
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar perfil
 */
router.put("/update-profile", authMiddleware, controller.updateProfile)

module.exports = router