const prisma = require("../database/prismaClient")
const bcrypt = require("bcrypt")

exports.register = async (req, res) => {
  try {
    const { email, senha } = req.body

    const existe = await prisma.user.findUnique({
      where: { email }
    })

    if (existe) {
      return res.status(400).json({ erro: "Usuário já existe" })
    }

    const senhaHash = await bcrypt.hash(senha, 10)

    const user = await prisma.user.create({
      data: {
        email,
        senha: senhaHash
      }
    })

    res.status(201).json({ mensagem: "Usuário criado" })

  } catch (error) {
    console.error(error)
    res.status(500).json({ erro: "Erro ao criar usuário" })
  }
}