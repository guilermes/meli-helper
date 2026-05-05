const { calcularValores } = require("../services/anuncioService")
const prisma = require("../database/prismaClient")

// 🔹 Função auxiliar para converter números
function toNumber(valor) {
  if (valor === undefined || valor === null || valor === "") return null
  return Number(valor)
}

// GET (listar todos)
exports.getAll = async (req, res) => {
  const anuncios = await prisma.anuncio.findMany()

  const resultado = await Promise.all(
    anuncios.map(async (a) => {
      const calculado = await calcularValores(a)

      return {
        ...a,
        ...calculado,

        // 🔥 FORÇA usar frete do microserviço
        frete: calculado.freteCalculado
      }
    })
  )

  res.json(resultado)
}

// GET por ID
exports.getById = async (req, res) => {
  try {
    const anuncio = await prisma.anuncio.findUnique({
      where: { id: Number(req.params.id) }
    })

    if (!anuncio) {
      return res.status(404).json({ erro: "Anúncio não encontrado" })
    }

    res.json({
      ...anuncio,
      ...calculado,
      frete: calculado.freteCalculado
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ erro: "Erro ao buscar anúncio" })
  }
}

// POST (criar)
exports.create = async (req, res) => {
  try {
    const {
      idMercadoLivre, nome, marca,
      custo, precoVenda, frete,
      largura, altura, comprimento, peso
    } = req.body

    const novo = await prisma.anuncio.create({
      data: {
        idMercadoLivre: idMercadoLivre || null,
        nome,
        marca,
        custo: toNumber(custo),
        precoVenda: toNumber(precoVenda),
        frete: toNumber(frete),
        largura: toNumber(largura),
        altura: toNumber(altura),
        comprimento: toNumber(comprimento),
        peso: toNumber(peso)
      }
    })

    res.status(201).json(novo)

  } catch (error) {
    console.error(error)
    res.status(500).json({ erro: "Erro ao criar anúncio" })
  }
}

// PUT (atualizar)
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const atualizado = await prisma.anuncio.update({
      where: { id },
      data: {
        idMercadoLivre: req.body.idMercadoLivre || null,
        nome: req.body.nome,
        marca: req.body.marca,
        custo: toNumber(req.body.custo),
        precoVenda: toNumber(req.body.precoVenda),
        frete: toNumber(req.body.frete),

        // 🔥 NOVOS CAMPOS
        largura: toNumber(req.body.largura),
        altura: toNumber(req.body.altura),
        comprimento: toNumber(req.body.comprimento),
        peso: toNumber(req.body.peso)
      }
    })

    res.json(atualizado)

  } catch (error) {
    console.error(error)
    res.status(404).json({ erro: "Anúncio não encontrado" })
  }
}

// DELETE
exports.delete = async (req, res) => {
  try {
    await prisma.anuncio.delete({
      where: { id: Number(req.params.id) }
    })

    res.json({ mensagem: "Anúncio removido" })

  } catch (error) {
    console.error(error)
    res.status(404).json({ erro: "Anúncio não encontrado" })
  }
}