const express = require("express")

const router = express.Router()

const controller =
  require("../controllers/authController")

const auth =
  require("../middlewares/authMiddleware")

///////////////////////////////////////////////////////////

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação e usuários
 */

///////////////////////////////////////////////////////////

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - nomeLoja
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *               nomeLoja:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               nicho:
 *                 type: string
 *               nivelSeller:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado
 */
router.post("/register", controller.register)

///////////////////////////////////////////////////////////

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login
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
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado
 */
router.post("/login", controller.login)

///////////////////////////////////////////////////////////

router.get("/profile", auth, controller.getProfile)
router.put("/profile", auth, controller.updateProfile)

///////////////////////////////////////////////////////////

module.exports = router