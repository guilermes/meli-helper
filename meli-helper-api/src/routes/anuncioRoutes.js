const express = require("express")
const router = express.Router()
const controller = require("../controllers/anuncioController")
const auth = require("../middlewares/authMiddleware")

/**
 * @swagger
 * tags:
 *   name: Anúncios
 *   description: Endpoints de anúncios
 */

/**
 * @swagger
 * /anuncios:
 *   get:
 *     summary: Lista todos os anúncios
 *     tags: [Anúncios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de anúncios
 */
router.get("/", auth, controller.getAll)

/**
 * @swagger
 * /anuncios/{id}:
 *   get:
 *     summary: Busca um anúncio por ID
 *     tags: [Anúncios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Anúncio encontrado
 *       404:
 *         description: Anúncio não encontrado
 */
router.get("/:id", auth, controller.getById)

/**
 * @swagger
 * /anuncios:
 *   post:
 *     summary: Cria um novo anúncio
 *     tags: [Anúncios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idMercadoLivre:
 *                 type: string
 *               nome:
 *                 type: string
 *               marca:
 *                 type: string
 *               custo:
 *                 type: number
 *               precoVenda:
 *                 type: number
 *               frete:
 *                 type: number
 *     responses:
 *       201:
 *         description: Anúncio criado com sucesso
 */
router.post("/", auth, controller.create)

/**
 * @swagger
 * /anuncios/{id}:
 *   put:
 *     summary: Atualiza um anúncio
 *     tags: [Anúncios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               marca:
 *                 type: string
 *               custo:
 *                 type: number
 *               precoVenda:
 *                 type: number
 *               frete:
 *                 type: number
 *     responses:
 *       200:
 *         description: Anúncio atualizado
 *       404:
 *         description: Anúncio não encontrado
 */
router.put("/:id", auth, controller.update)

/**
 * @swagger
 * /anuncios/{id}:
 *   delete:
 *     summary: Remove um anúncio
 *     tags: [Anúncios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Anúncio removido
 *       404:
 *         description: Anúncio não encontrado
 */
router.delete("/:id", auth, controller.delete)

module.exports = router