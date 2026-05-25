const prisma = require("../database/prismaClient")
const bcrypt = require("bcrypt")

exports.register = async (req, res) => {

  try {

    const {
      nome,
      nomeLoja,
      email,
      senha
    } = req.body

    ////////////////////////////////////////////////////////////

    // 🔥 VALIDAÇÕES

    if (!nome || nome.trim().length < 3) {
      return res.status(400).json({
        erro: "Nome inválido"
      })
    }

    if (!nomeLoja || nomeLoja.trim().length < 3) {
      return res.status(400).json({
        erro: "Nome da loja inválido"
      })
    }

    if (!email || !email.includes("@")) {
      return res.status(400).json({
        erro: "Email inválido"
      })
    }

    if (!senha || senha.length < 6) {
      return res.status(400).json({
        erro: "Senha deve ter pelo menos 6 caracteres"
      })
    }

    ////////////////////////////////////////////////////////////

    // 🔥 VERIFICA EMAIL

    const existe = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (existe) {
      return res.status(400).json({
        erro: "Usuário já existe"
      })
    }

    ////////////////////////////////////////////////////////////

    // 🔥 HASH SENHA

    const senhaHash = await bcrypt.hash(senha, 10)

    ////////////////////////////////////////////////////////////

    // 🔥 CRIAR USUÁRIO

    const user = await prisma.user.create({
      data: {

        nome,
        nomeLoja,

        email,

        senha: senhaHash
      }
    })

    ////////////////////////////////////////////////////////////

    res.status(201).json({
      mensagem: "Usuário criado com sucesso",
      user: {
        id: user.id,
        nome: user.nome,
        nomeLoja: user.nomeLoja,
        email: user.email
      }
    })

  }
  catch (error) {

    console.error(error)

    res.status(500).json({
      erro: "Erro ao criar usuário"
    })
  }
}