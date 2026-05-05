const { calcularFrete } = require("../services/freteService")

exports.calcularFrete = (req, res) => {
  try {
    const { peso, largura, altura, comprimento, precoVenda } = req.body

    const frete = calcularFrete({
      peso,
      largura,
      altura,
      comprimento,
      precoVenda
    })

    res.json({ frete })

  } catch (error) {
    console.error(error)
    res.status(500).json({ erro: "Erro ao calcular frete" })
  }
}