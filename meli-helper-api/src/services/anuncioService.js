const prisma = require("../database/prismaClient")

////////////////////////////////////////////////////////////

// 🔹 CONFIG DO USUÁRIO
async function getConfiguracao(userId) {

  if (!userId) {
    throw new Error("userId não informado")
  }

  let config =
    await prisma.configuracao.findUnique({
      where: {
        userId
      }
    })

  if (!config) {

    config =
      await prisma.configuracao.create({

        data: {
          imposto: 0,
          custoOperacional: 0,
          userId
        }
      })
  }

  return config
}

////////////////////////////////////////////////////////////

// 🔹 SALVAR CONFIG
async function setConfiguracao(userId, novaConfig) {

  const existente =
    await prisma.configuracao.findUnique({
      where: {
        userId
      }
    })

  if (!existente) {

    return prisma.configuracao.create({

      data: {
        ...novaConfig,
        userId
      }
    })
  }

  return prisma.configuracao.update({

    where: {
      userId
    },

    data: novaConfig
  })
}

////////////////////////////////////////////////////////////

// 🔹 PESO CÚBICO
function calcularPesoCubico({
  largura,
  altura,
  comprimento
}) {

  if (!largura || !altura || !comprimento) {
    return 0
  }

  return (
    largura *
    altura *
    comprimento
  ) / 6000
}

////////////////////////////////////////////////////////////

// 🔹 PESO UTILIZADO
function calcularPesoUtilizado(anuncio) {

  const pesoCubico =
    calcularPesoCubico(anuncio)

  const pesoReal =
    anuncio.peso || 0

  return pesoCubico > pesoReal
    ? pesoCubico
    : pesoReal
}

////////////////////////////////////////////////////////////

// 🔹 FRETE
async function calcularFrete(anuncio) {

  try {

    const response =
      await fetch(
        "http://localhost:4000/calcular",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            precoVenda: anuncio.precoVenda,

            largura: anuncio.largura,
            altura: anuncio.altura,
            comprimento: anuncio.comprimento,

            peso: anuncio.peso
          })
        }
      )

    if (!response.ok) {
      throw new Error("Erro no frete")
    }

    const data = await response.json()

    return data.frete

  } catch (error) {

    console.error(error)

    return 0
  }
}

////////////////////////////////////////////////////////////

// 🔥 CALCULAR VALORES
async function calcularValores(
  anuncio,
  userId
) {

  const config =
    await getConfiguracao(userId)

  const frete =
    await calcularFrete(anuncio)

  const pesoUtilizado =
    calcularPesoUtilizado(anuncio)

  ////////////////////////////////////////////////////////
  // 🔥 COMISSÃO ML (conforme tipo do anúncio)

  const taxaComissao =
    anuncio.tipoAnuncio === "PREMIUM" ? 0.18 : 0.12

  const comissao =
    anuncio.precoVenda * taxaComissao

  ////////////////////////////////////////////////////////
  // 🔥 IMPOSTO

  const impostoValor =
    (config.imposto / 100) *
    anuncio.precoVenda

  ////////////////////////////////////////////////////////
  // 🔥 LUCRO

  const lucro =
    anuncio.precoVenda -
    anuncio.custo -
    frete -
    impostoValor -
    config.custoOperacional -
    comissao

  const margem =
    (lucro / anuncio.precoVenda) * 100

  ////////////////////////////////////////////////////////

  return {

    freteCalculado: frete,

    pesoUtilizado:
      Number(pesoUtilizado.toFixed(2)),

    lucro:
      Number(lucro.toFixed(2)),

    margemPorcentagem:
      Number(margem.toFixed(2))
  }
}

////////////////////////////////////////////////////////////

module.exports = {

  calcularValores,

  setConfiguracao,
  getConfiguracao
}