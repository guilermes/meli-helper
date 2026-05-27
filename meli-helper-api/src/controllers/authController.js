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
      confirmarSenha,
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

    if (senha !== confirmarSenha) {

      return res.status(400).json({
        erro: "As senhas não coincidem"
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

///////////////////////////////////////////////////////////

// 🔹 PERFIL (GET)
exports.getProfile = async (req, res) => {

  try {

    const user =
      await prisma.user.findUnique({

        where: {
          id: req.user.id
        },

        select: {
          id: true,
          nome: true,
          nomeLoja: true,
          email: true,
          nicho: true,
          nivelSeller: true
        }
      })

    if (!user) {

      return res.status(404).json({
        erro: "Usuário não encontrado"
      })
    }

    res.json(user)
  }

  catch (error) {

    console.error(error)

    res.status(500).json({
      erro: "Erro ao buscar perfil"
    })
  }
}

///////////////////////////////////////////////////////////

// 🔹 PERFIL (UPDATE)
exports.updateProfile = async (req, res) => {

  try {

    let {
      nome,
      nomeLoja,
      nicho,
      nivelSeller,
      senha,
      confirmarSenha
    } = req.body

    nome = nome?.trim()
    nomeLoja = nomeLoja?.trim()
    nicho = nicho?.trim() || null
    nivelSeller = nivelSeller?.trim() || null

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

    const data = {
      nome,
      nomeLoja,
      nicho,
      nivelSeller
    }

    if (senha || confirmarSenha) {

      if (senha !== confirmarSenha) {

        return res.status(400).json({
          erro: "As senhas não coincidem"
        })
      }

      if (!senhaForte(senha)) {

        return res.status(400).json({
          erro:
            "Senha deve ter 8 caracteres, letra maiúscula, minúscula e número"
        })
      }

      data.senha =
        await bcrypt.hash(senha, 10)
    }

    const user =
      await prisma.user.update({

        where: {
          id: req.user.id
        },

        data,

        select: {
          id: true,
          nome: true,
          nomeLoja: true,
          email: true,
          nicho: true,
          nivelSeller: true
        }
      })

    res.json({

      mensagem: "Perfil atualizado com sucesso",
      user
    })
  }

  catch (error) {

    console.error(error)

    res.status(500).json({
      erro: "Erro ao atualizar perfil"
    })
  }
}