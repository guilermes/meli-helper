const { calcularValores } = require("../services/anuncioService")
const prisma = require("../database/prismaClient")

////////////////////////////////////////////////////////////

// 🔹 Função auxiliar
function toNumber(valor) {

  if (
    valor === undefined ||
    valor === null ||
    valor === ""
  ) {
    return null
  }

  return Number(valor)
}

////////////////////////////////////////////////////////////

// 🔹 LISTAR ANÚNCIOS
exports.getAll = async (req, res) => {

  try {

    ////////////////////////////////////////////////////////////

    const userId = req.user.id

    const search = req.query.search || ""

    const page =
      Number(req.query.page) || 1

    const limit =
      Number(req.query.limit) || 10

    const skip =
      (page - 1) * limit

    ////////////////////////////////////////////////////////////

    const where = {

      userId,

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

    ////////////////////////////////////////////////////////////

    const total =
      await prisma.anuncio.count({
        where
      })

    ////////////////////////////////////////////////////////////

    const anuncios =
      await prisma.anuncio.findMany({

        where,

        skip,
        take: limit,

        orderBy: {
          id: "desc"
        }
      })

    ////////////////////////////////////////////////////////////

    const resultado = await Promise.all(

      anuncios.map(async (a) => {

        const calculado =
          await calcularValores(
            a,
            userId
          )

        return {

          ...a,
          ...calculado,

          frete:
            calculado.freteCalculado
        }
      })
    )

    ////////////////////////////////////////////////////////////

    res.json({

      data: resultado,

      pagination: {

        total,

        page,
        limit,

        totalPages:
          Math.ceil(total / limit)
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

// 🔹 BUSCAR POR ID
exports.getById = async (req, res) => {

  try {

    ////////////////////////////////////////////////////////////

    const userId = req.user.id

    const id =
      Number(req.params.id)

    ////////////////////////////////////////////////////////////

    const anuncio =
      await prisma.anuncio.findFirst({

        where: {
          id,
          userId
        }
      })

    ////////////////////////////////////////////////////////////

    if (!anuncio) {

      return res.status(404).json({
        erro: "Anúncio não encontrado"
      })
    }

    ////////////////////////////////////////////////////////////

    const calculado =
      await calcularValores(
        anuncio,
        userId
      )

    ////////////////////////////////////////////////////////////

    res.json({

      ...anuncio,
      ...calculado,

      frete:
        calculado.freteCalculado
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

// 🔹 CRIAR ANÚNCIO
exports.create = async (req, res) => {

  try {

    ////////////////////////////////////////////////////////////

    const userId = req.user.id

    const {

      idMercadoLivre,

      nome,
      marca,

      tipoAnuncio,

      custo,
      precoVenda,
      frete,

      largura,
      altura,
      comprimento,
      peso

    } = req.body

    ////////////////////////////////////////////////////////////
    // 🔥 VALIDAÇÕES

    if (!nome || nome.trim() === "") {

      return res.status(400).json({
        erro: "Nome obrigatório"
      })
    }

    if (!marca || marca.trim() === "") {

      return res.status(400).json({
        erro: "Marca obrigatória"
      })
    }

    if (
      !tipoAnuncio ||
      !["CLASSICO", "PREMIUM"].includes(tipoAnuncio)
    ) {

      return res.status(400).json({
        erro: "Tipo de anúncio inválido (CLASSICO ou PREMIUM)"
      })
    }

    if (Number(custo) <= 0) {

      return res.status(400).json({
        erro: "Custo inválido"
      })
    }

    if (Number(precoVenda) <= 0) {

      return res.status(400).json({
        erro: "Preço inválido"
      })
    }

    ////////////////////////////////////////////////////////////

    const novo =
      await prisma.anuncio.create({

        data: {

          userId,

          idMercadoLivre:
            idMercadoLivre || null,

          nome,
          marca,

          tipoAnuncio,

          custo:
            toNumber(custo),

          precoVenda:
            toNumber(precoVenda),

          frete:
            toNumber(frete) || 0,

          largura:
            toNumber(largura),

          altura:
            toNumber(altura),

          comprimento:
            toNumber(comprimento),

          peso:
            toNumber(peso)
        }
      })

    ////////////////////////////////////////////////////////////

    res.status(201).json({
      mensagem: "Anúncio criado",
      data: novo
    })

  }
  catch (error) {

    console.error(error)

    res.status(500).json({
      erro: "Erro ao criar anúncio"
    })
  }
}

////////////////////////////////////////////////////////////

// 🔹 ATUALIZAR
exports.update = async (req, res) => {

  try {
    const { id } = req.params; // Certifique-se de que o ID está sendo pego aqui

    const atualizado = await prisma.anuncio.update({
      where: {
        id: Number(id)
      },
      data: {
        idMercadoLivre: req.body.idMercadoLivre || null,
        nome: req.body.nome,
        marca: req.body.marca,
        tipoAnuncio: req.body.tipoAnuncio,
        custo: toNumber(req.body.custo),
        precoVenda: toNumber(req.body.precoVenda),

        // 🌟 CORREÇÃO: Aceita 'freteCalculado' vindo do Front ou 'frete' padrão
        frete: toNumber(req.body.freteCalculado || req.body.frete),

        largura: toNumber(req.body.largura),
        altura: toNumber(req.body.altura),
        comprimento: toNumber(req.body.comprimento),
        peso: toNumber(req.body.peso)
      }
    });

    // Retorna o status 200 explicitamente com o registro atualizado
    return res.status(200).json({
      mensagem: "Anúncio atualizado",
      data: atualizado
    });

  } catch (error) {
    console.error("Erro no controller de atualização:", error);
    return res.status(500).json({
      erro: "Erro ao atualizar anúncio"
    });
  }
}

////////////////////////////////////////////////////////////

// 🔹 DELETE
exports.delete = async (req, res) => {

  try {

    ////////////////////////////////////////////////////////////

    const userId = req.user.id

    const id =
      Number(req.params.id)

    ////////////////////////////////////////////////////////////

    const anuncio =
      await prisma.anuncio.findFirst({

        where: {
          id,
          userId
        }
      })

    ////////////////////////////////////////////////////////////

    if (!anuncio) {

      return res.status(404).json({
        erro: "Anúncio não encontrado"
      })
    }

    ////////////////////////////////////////////////////////////

    await prisma.anuncio.delete({

      where: {
        id
      }
    })

    ////////////////////////////////////////////////////////////

    res.json({
      mensagem: "Anúncio removido"
    })

  }
  catch (error) {

    console.error(error)

    res.status(500).json({
      erro: "Erro ao remover anúncio"
    })
  }
}