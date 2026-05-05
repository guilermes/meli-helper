const { setConfiguracao, getConfiguracao } = require("../services/anuncioService")

// GET config
exports.get = async (req, res) => {
  const config = await getConfiguracao()
  res.json(config)
}

// POST config
exports.set = async (req, res) => {
  const { comissao, imposto, custoOperacional } = req.body

  const config = await setConfiguracao({
    comissao,
    imposto,
    custoOperacional
  })

  res.json(config)
}