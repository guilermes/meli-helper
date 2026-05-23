const { calcularValores } = require("../services/anuncioService")
const prisma = require("../database/prismaClient")

// 🔹 Função auxiliar para converter números
function toNumber(valor) {
  if (valor === undefined || valor === null || valor === "") {
    return null
  }

  return Number(valor)
}

////////////////////////////////////////////////////////////

// GET (listar anúncios com pesquisa + paginação)
exports.getAll = async (req, res) => {

  try {

    // 🔍 QUERY PARAMS
    const search = req.query.search || ""

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    // 🔥 PAGINAÇÃO
    const skip = (page - 1) * limit

    // 🔥 FILTRO
    const where = {
      OR: [
        {
          nome: {
            contains: search
          }
        },
        {
          marca: {
            contains: search
          }
        },
        {
          idMercadoLivre: {
            contains: search
          }
        }
      ]
    }

    // 🔥 TOTAL DE REGISTROS
    const total = await prisma.anuncio.count({
      where
    })

    // 🔥 BUSCA PAGINADA
    const anuncios = await prisma.anuncio.findMany({

      where,

      skip,
      take: limit,

      orderBy: {
        id: "desc"
      }
    })

    // 🔥 CALCULAR MARGENS
    const resultado = await Promise.all(

      anuncios.map(async (a) => {

        const calculado = await calcularValores(a)

        return {
          ...a,
          ...calculado,

          // 🔥 FORÇA FRETE DO MICROSERVIÇO
          frete: calculado.freteCalculado
        }
      })
    )

    // 🔥 RETORNO PADRONIZADO
    res.json({

      data: resultado,

      pagination: {
        total,
        page,
        limit,

        totalPages: Math.ceil(total / limit)
      }
    })

  }
  catch (error) {

    console.error(error)

    res.status(500).json({
      erro: "Erro ao listar anúncios"
    })
  }
}

////////////////////////////////////////////////////////////

// GET por ID
exports.getById = async (req, res) => {

  try {

    const anuncio = await prisma.anuncio.findUnique({
      where: {
        id: Number(req.params.id)
      }
    })

    if (!anuncio) {
      return res.status(404).json({
        erro: "Anúncio não encontrado"
      })
    }

    const calculado = await calcularValores(anuncio)

    res.json({
      ...anuncio,
      ...calculado,

      frete: calculado.freteCalculado
    })

  }
  catch (error) {

    console.error(error)

    res.status(500).json({
      erro: "Erro ao buscar anúncio"
    })
  }
}

////////////////////////////////////////////////////////////

// POST (criar)
exports.create = async (req, res) => {

  try {

    const {
      idMercadoLivre,
      nome,
      marca,
      custo,
      precoVenda,
      frete,
      largura,
      altura,
      comprimento,
      peso
    } = req.body

    const novo = await prisma.anuncio.create({

      data: {
        idMercadoLivre: idMercadoLivre || null,

        nome,
        marca,

        custo: toNumber(custo),
        precoVenda: toNumber(precoVenda),

        frete: toNumber(frete) || 0,

        largura: toNumber(largura),
        altura: toNumber(altura),
        comprimento: toNumber(comprimento),
        peso: toNumber(peso)
      }
    })

    res.status(201).json(novo)

  }
  catch (error) {

    console.error(error)

    res.status(500).json({
      erro: "Erro ao criar anúncio"
    })
  }
}

////////////////////////////////////////////////////////////

// PUT (atualizar)
exports.update = async (req, res) => {

  try {

    const id = Number(req.params.id)

    const atualizado = await prisma.anuncio.update({

      where: {
        id
      },

      data: {

        idMercadoLivre: req.body.idMercadoLivre || null,

        nome: req.body.nome,
        marca: req.body.marca,

        custo: toNumber(req.body.custo),
        precoVenda: toNumber(req.body.precoVenda),

        frete: toNumber(req.body.frete),

        largura: toNumber(req.body.largura),
        altura: toNumber(req.body.altura),
        comprimento: toNumber(req.body.comprimento),
        peso: toNumber(req.body.peso)
      }
    })

    res.json(atualizado)

  }
  catch (error) {

    console.error(error)

    res.status(404).json({
      erro: "Anúncio não encontrado"
    })
  }
}

////////////////////////////////////////////////////////////

// DELETE
exports.delete = async (req, res) => {

  try {

    await prisma.anuncio.delete({
      where: {
        id: Number(req.params.id)
      }
    })

    res.json({
      mensagem: "Anúncio removido"
    })

  }
  catch (error) {

    console.error(error)

    res.status(404).json({
      erro: "Anúncio não encontrado"
    })
  }
}