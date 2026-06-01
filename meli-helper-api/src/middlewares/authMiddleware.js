// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const SECRET = "segredo123";

module.exports = (req, res, next) => {
  // Captura o cookie HttpOnly de forma automática e segura
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ erro: "Sessão inválida ou não encontrada. Faça login novamente." });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ erro: "Sessão expirada ou token corrompido" });
  }
};