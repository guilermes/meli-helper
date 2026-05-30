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
 * /anuncios/calcular-frete:
 *   post:
 *     summary: Calcula o frete estimado para um produto
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
 *               precoVenda:
 *                 type: number
 *                 example: 120
 *               peso:
 *                 type: number
 *                 example: 0.8
 *               largura:
 *                 type: number
 *                 example: 20
 *               altura:
 *                 type: number
 *                 example: 10
 *               comprimento:
 *                 type: number
 *                 example: 15
 *     responses:
 *       200:
 *         description: Frete calculado com sucesso
 */

// ⚠️ DEVE ficar antes de /:id para o Express não confundir "calcular-frete" com um ID
router.post("/calcular-frete", auth, async (req, res) => {

  try {

    const response =
      await fetch(
        "http://localhost:4000/calcular-frete",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(req.body)
        }
      )

    if (!response.ok) {
      throw new Error(`Frete service retornou ${response.status}`)
    }

    const data = await response.json()

    res.json({ frete: data.frete || 0 })

  }
  catch (error) {

    console.error("Erro ao calcular frete:", error.message)

    res.status(500).json({
      erro: "Erro ao calcular frete"
    })
  }
})

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
 *             required:
 *               - nome
 *               - precoVenda
 *             properties:
 *               idMercadoLivre:
 *                 type: string
 *                 example: MLB123456
 *               nome:
 *                 type: string
 *                 example: Fone Bluetooth
 *               marca:
 *                 type: string
 *                 example: JBL
 *               tipoAnuncio:
 *                 type: string
 *                 enum: [CLASSICO, PREMIUM]
 *                 example: CLASSICO
 *               custo:
 *                 type: number
 *                 example: 50
 *               precoVenda:
 *                 type: number
 *                 example: 120
 *               largura:
 *                 type: number
 *                 example: 20
 *               altura:
 *                 type: number
 *                 example: 10
 *               comprimento:
 *                 type: number
 *                 example: 15
 *               peso:
 *                 type: number
 *                 example: 0.8
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
 *                 example: Produto Atualizado
 *               marca:
 *                 type: string
 *                 example: Samsung
 *               tipoAnuncio:
 *                 type: string
 *                 enum: [CLASSICO, PREMIUM]
 *                 example: PREMIUM
 *               custo:
 *                 type: number
 *                 example: 60
 *               precoVenda:
 *                 type: number
 *                 example: 150
 *               largura:
 *                 type: number
 *                 example: 25
 *               altura:
 *                 type: number
 *                 example: 12
 *               comprimento:
 *                 type: number
 *                 example: 18
 *               peso:
 *                 type: number
 *                 example: 1.2
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