const prisma = require("../database/prismaClient")

async function getConfiguracao() {
  let config = await prisma.configuracao.findFirst()

  if (!config) {
    config = await prisma.configuracao.create({
      data: {
        comissao: 0,
        imposto: 0,
        custoOperacional: 0
      }
    })
  }

  return config
}

async function setConfiguracao(novaConfig) {
  const existente = await prisma.configuracao.findFirst()

  if (!existente) {
    return prisma.configuracao.create({ data: novaConfig })
  }

  return prisma.configuracao.update({
    where: { id: existente.id },
    data: novaConfig
  })
}

async function calcularValores(anuncio) {
  const config = await getConfiguracao()

  const frete = await calcularFrete(anuncio)

  const pesoUtilizado = calcularPesoUtilizado(anuncio) // 👈 AQUI

  const comissaoValor = (config.comissao / 100) * anuncio.precoVenda
  const impostoValor = (config.imposto / 100) * anuncio.precoVenda

  const lucro =
    anuncio.precoVenda -
    anuncio.custo -
    frete -
    comissaoValor -
    impostoValor -
    config.custoOperacional

  const margem = (lucro / anuncio.precoVenda) * 100

  return {
    freteCalculado: frete,
    pesoUtilizado: Number(pesoUtilizado.toFixed(2)), // 👈 NOVO
    lucroLiquido: Number(lucro.toFixed(2)),
    margemLiquida: Number(margem.toFixed(2))
  }
}

function calcularPesoCubico({ largura, altura, comprimento }) {
  if (!largura || !altura || !comprimento) return 0

  return (largura * altura * comprimento) / 6000
}

function calcularPesoUtilizado(anuncio) {
  const pesoCubico = calcularPesoCubico(anuncio)
  const pesoReal = anuncio.peso || 0

  return pesoCubico > pesoReal ? pesoCubico : pesoReal
}

async function calcularFrete(anuncio) {
  try {
    const response = await fetch("http://localhost:4000/calcular-frete", {
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
    })

    if (!response.ok) {
      throw new Error("Erro no microserviço de frete")
    }

    const data = await response.json()

    return data.frete
  } catch (error) {
    console.error("Erro ao calcular frete:", error)
    return 0
  }
}

module.exports = {
  calcularValores,
  setConfiguracao,
  getConfiguracao
}