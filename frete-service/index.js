const express = require("express")
const app = express()
const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./swagger")


app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(express.json())

// 🔥 FAIXA DE PREÇO
function getFaixaPreco(preco) {
  if (preco <= 18.99) return 0
  if (preco <= 48.99) return 1
  if (preco <= 78.99) return 2
  if (preco <= 99.99) return 3
  if (preco <= 119.99) return 4
  if (preco <= 149.99) return 5
  if (preco <= 199.99) return 6
  return 7
}

// 🔥 FAIXA DE PESO
function getFaixaPeso(peso) {
  if (peso <= 0.3) return 0
  if (peso <= 0.5) return 1
  if (peso <= 1) return 2
  if (peso <= 1.5) return 3
  if (peso <= 2) return 4
  if (peso <= 3) return 5
  if (peso <= 4) return 6
  if (peso <= 5) return 7
  if (peso <= 6) return 8
  if (peso <= 7) return 9
  if (peso <= 8) return 10
  if (peso <= 9) return 11
  if (peso <= 11) return 12
  if (peso <= 13) return 13
  if (peso <= 15) return 14
  if (peso <= 17) return 15
  if (peso <= 20) return 16
  if (peso <= 25) return 17
  if (peso <= 30) return 18
  if (peso <= 40) return 19
  if (peso <= 50) return 20
  if (peso <= 60) return 21
  if (peso <= 70) return 22
  if (peso <= 80) return 23
  if (peso <= 90) return 24
  if (peso <= 100) return 25
  if (peso <= 125) return 26
  if (peso <= 150) return 27
  return 28
}

// 🔥 TABELA COMPLETA
const tabela = [
  [5.65,6.55,7.75,12.35,14.35,16.45,18.45,20.95],
  [5.95,6.65,7.85,13.25,15.45,17.65,19.85,22.55],
  [6.05,6.75,7.95,13.85,16.15,18.45,20.75,23.65],
  [6.15,6.85,8.05,14.15,16.45,18.85,21.15,24.65],
  [6.25,6.95,8.15,14.45,16.85,19.25,21.65,24.65],
  [6.35,7.95,8.55,15.75,18.35,21.05,23.65,26.25],
  [6.45,8.15,8.95,17.05,19.85,22.65,25.55,28.35],
  [6.55,8.35,9.75,18.45,21.55,24.65,27.75,30.75],
  [6.65,8.55,9.95,25.45,28.55,32.65,35.75,39.75],
  [6.75,8.75,10.15,27.05,31.05,36.05,40.05,44.05],
  [6.85,8.95,10.35,28.85,33.65,38.45,43.25,48.05],
  [6.95,9.15,10.55,29.65,34.55,39.55,44.45,49.35],
  [7.05,9.55,10.95,41.25,48.05,54.95,61.75,68.65],
  [7.15,9.95,11.35,42.15,49.25,56.25,63.25,70.25],
  [7.25,10.15,11.55,45.05,52.45,59.95,67.45,74.95],
  [7.35,10.35,11.75,48.55,56.05,63.55,70.75,78.65],
  [7.45,10.55,11.95,54.75,63.85,72.95,82.05,91.15],
  [7.65,10.95,12.15,64.05,75.05,84.75,95.35,105.95],
  [7.75,11.15,12.35,65.95,75.45,85.55,96.25,106.95],
  [7.85,11.35,12.55,67.75,78.95,88.95,99.15,107.05],
  [7.95,11.55,12.75,70.25,81.05,92.05,102.55,110.75],
  [8.05,11.75,12.95,74.95,86.45,98.15,109.35,118.15],
  [8.15,11.95,13.15,80.25,92.95,105.05,117.15,126.55],
  [8.25,12.15,13.35,83.95,97.05,109.85,122.45,132.25],
  [8.35,12.35,13.55,93.25,107.45,122.05,136.05,146.95],
  [8.45,12.55,13.75,106.55,123.95,139.55,155.55,167.95],
  [8.55,12.75,13.95,119.25,138.05,156.05,173.95,187.95],
  [8.65,12.75,14.15,126.55,146.15,165.65,184.65,199.45],
  [8.75,12.95,14.35,166.15,192.45,217.55,242.55,261.95]
]

/**
 * @swagger
 * /calcular-frete:
 *   post:
 *     summary: Calcula o frete com base no peso e cubagem
 *     tags: [Frete]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               precoVenda:
 *                 type: number
 *               largura:
 *                 type: number
 *               altura:
 *                 type: number
 *               comprimento:
 *                 type: number
 *               peso:
 *                 type: number
 *     responses:
 *       200:
 *         description: Frete calculado com sucesso
 */
// 🔥 ROTA FINAL
app.post("/calcular-frete", (req, res) => {
  const { precoVenda, largura, altura, comprimento, peso } = req.body

  if (!precoVenda) {
    return res.status(400).json({ erro: "Preço de venda obrigatório" })
  }

  const pesoCubico = (largura * altura * comprimento) / 6000 || 0
  const pesoUtilizado = Math.max(peso || 0, pesoCubico)

  const faixaPreco = getFaixaPreco(precoVenda)
  const faixaPeso = getFaixaPeso(pesoUtilizado)

  const frete = tabela[faixaPeso][faixaPreco]

  res.json({
    frete: Number(frete.toFixed(2)),
    pesoUtilizado: Number(pesoUtilizado.toFixed(3))
  })
})

// 🚀 START
app.listen(4000, () => {
  console.log("🚚 Frete service rodando na porta 4000")
})