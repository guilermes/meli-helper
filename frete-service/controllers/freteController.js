const { calcularFrete } = require("../services/freteService");

exports.calcularFrete = (req, res) => {
  try {
    const { peso, largura, altura, comprimento, precoVenda } = req.body;

    if (precoVenda === undefined || precoVenda === null) {
      return res.status(400).json({ erro: "Preço de venda obrigatório" });
    }

    const resultado = calcularFrete({
      peso: peso || 0,
      largura: largura || 0,
      altura: altura || 0,
      comprimento: comprimento || 0,
      precoVenda
    });

    res.json(resultado);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao calcular frete" });
  }
};