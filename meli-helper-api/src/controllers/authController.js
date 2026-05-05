const prisma = require("../database/prismaClient")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const SECRET = "segredo123"

exports.login = async (req, res) => {
  const { email, senha } = req.body

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return res.status(401).json({ erro: "Usuário não encontrado" })
  }

  const senhaValida = await bcrypt.compare(senha, user.senha)

  if (!senhaValida) {
    return res.status(401).json({ erro: "Senha inválida" })
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    SECRET,
    { expiresIn: "1h" }
  )

  res.json({ token })
}