const prisma = require("../database/prismaClient")

const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")

const SECRET = "segredo123"

///////////////////////////////////////////////////////////

// 🔹 REGEX EMAIL
function emailValido(email) {

  const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return regex.test(email)
}

///////////////////////////////////////////////////////////

// 🔹 SENHA FORTE
function senhaForte(senha) {

  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

  return regex.test(senha)
}

///////////////////////////////////////////////////////////

// 🔹 REGISTER
exports.register = async (req, res) => {

  try {

    let {
      nome,
      nomeLoja,
      email,
      senha,
      nicho,
      nivelSeller
    } = req.body

    // 🔥 LIMPEZA
    nome = nome?.trim()
    nomeLoja = nomeLoja?.trim()
    email = email?.trim().toLowerCase()

    ///////////////////////////////////////////////////////

    // 🔥 VALIDAÇÕES

    if (!nome || nome.length < 3) {

      return res.status(400).json({
        erro: "Nome deve ter no mínimo 3 caracteres"
      })
    }

    if (!nomeLoja || nomeLoja.length < 2) {

      return res.status(400).json({
        erro: "Nome da loja inválido"
      })
    }

    if (!emailValido(email)) {

      return res.status(400).json({
        erro: "Email inválido"
      })
    }

    if (!senhaForte(senha)) {

      return res.status(400).json({
        erro:
          "Senha deve ter 8 caracteres, letra maiúscula, minúscula e número"
      })
    }

    ///////////////////////////////////////////////////////

    // 🔥 EMAIL EXISTENTE

    const existe = await prisma.user.findUnique({
      where: { email }
    })

    if (existe) {

      return res.status(400).json({
        erro: "Email já cadastrado"
      })
    }

    ///////////////////////////////////////////////////////

    // 🔥 HASH SENHA

    const hash = await bcrypt.hash(senha, 10)

    ///////////////////////////////////////////////////////

    // 🔥 CREATE USER

    const user = await prisma.user.create({

      data: {

        nome,

        nomeLoja,

        email,

        senha: hash,

        nicho: nicho || null,

        nivelSeller: nivelSeller || null
      }
    })

    ///////////////////////////////////////////////////////

    res.status(201).json({

      mensagem: "Usuário criado com sucesso",

      user: {
        id: user.id,
        nome: user.nome,
        email: user.email
      }
    })
  }

  catch (error) {

    console.error(error)

    res.status(500).json({
      erro: "Erro ao cadastrar usuário"
    })
  }
}

///////////////////////////////////////////////////////////

// 🔹 LOGIN
exports.login = async (req, res) => {

  try {

    const { email, senha } = req.body

    if (!email || !senha) {

      return res.status(400).json({
        erro: "Email e senha obrigatórios"
      })
    }

    ///////////////////////////////////////////////////////

    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase()
      }
    })

    if (!user) {

      return res.status(401).json({
        erro: "Usuário não encontrado"
      })
    }

    ///////////////////////////////////////////////////////

    const senhaValida =
      await bcrypt.compare(senha, user.senha)

    if (!senhaValida) {

      return res.status(401).json({
        erro: "Senha inválida"
      })
    }

    ///////////////////////////////////////////////////////

    const token = jwt.sign(

      {
        id: user.id,
        email: user.email
      },

      SECRET,

      {
        expiresIn: "1h"
      }
    )

    ///////////////////////////////////////////////////////

    res.json({

      token,

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
      erro: "Erro ao realizar login"
    })
  }
}