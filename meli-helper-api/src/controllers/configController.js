const {
  setConfiguracao,
  getConfiguracao
} = require("../services/anuncioService")

////////////////////////////////////////////////////////////

// GET
exports.get = async (req, res) => {

  const config =
    await getConfiguracao(req.user.id)

  res.json(config)
}

////////////////////////////////////////////////////////////

// POST
exports.set = async (req, res) => {

  const {
    imposto,
    custoOperacional
  } = req.body

  const config =
    await setConfiguracao(

      req.user.id,

      {
        imposto,
        custoOperacional
      }
    )

  res.json(config)
}