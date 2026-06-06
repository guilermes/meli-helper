// src/controllers/authController.js
const prisma = require("../database/prismaClient.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const SECRET = process.env.JWT_SECRET;

function emailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function senhaForte(senha) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/;
  return regex.test(senha);
}

// 🔹 REGISTER
module.exports = {
  register: async (req, res) => {
    try {
      let { nome, nomeLoja, email, senha, confirmarSenha, nicho, nivelSeller } = req.body;

    nome = nome?.trim();
    nomeLoja = nomeLoja?.trim();
    email = email?.trim().toLowerCase();

    if (!nome || nome.length < 3) return res.status(400).json({ erro: "Nome deve ter no mínimo 3 caracteres" });
    if (!nomeLoja || nomeLoja.length < 2) return res.status(400).json({ erro: "Nome da loja inválido" });
    if (!emailValido(email)) return res.status(400).json({ erro: "Email inválido" });
    if (!senhaForte(senha)) return res.status(400).json({ erro: "Senha fraca" });

    const existe = await prisma.user.findUnique({ where: { email } });
    if (existe) return res.status(400).json({ erro: "Email já cadastrado" });

    const hash = await bcrypt.hash(senha, 10);

    const user = await prisma.user.create({
      data: { nome, nomeLoja, email, senha: hash, nicho: nicho || null, nivelSeller: nivelSeller || null }
    });

    res.status(201).json({
      mensagem: "Usuário criado com sucesso",
      user: { id: user.id, nome: user.nome, email: user.email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao cadastrar usuário" });
  }
},

// 🔹 LOGIN (Modificado para usar HttpOnly Cookie)
login: async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) return res.status(400).json({ erro: "Email e senha obrigatórios" });

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user) return res.status(401).json({ erro: "Usuário não encontrado" });

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) return res.status(401).json({ erro: "Senha inválida" });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1h" });

    // 🌟 CONFIGURAÇÃO DO COOKIE SEGURO
    res.cookie('token', token, {
      httpOnly: true, // Impede que códigos JS maliciosos leiam o token
      secure: true,  // Mude para 'true' quando subir para produção (exige HTTPS)
      sameSite: 'none', // Protege contra ataques CSRF
      maxAge: 3600000 // Expira em 1 hora (tempo exato do JWT em milissegundos)
    });

    // O token NÃO vai mais no JSON do corpo da resposta
    res.json({
      mensagem: "Login realizado com sucesso",
      user: { id: user.id, nome: user.nome, nomeLoja: user.nomeLoja, email: user.email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao realizar login" });
  }
},

// 🔹 LOGOUT (Nova rota para destruir o cookie)
logout: async (req, res) => {
  res.clearCookie('token');
  return res.json({ mensagem: "Sessão encerrada com sucesso" });
},

// 🔹 PERFIL (GET)
getProfile: async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, nome: true, nomeLoja: true, email: true, nicho: true, nivelSeller: true }
    });
    if (!user) return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar perfil" });
  }
},

// 🔹 PERFIL (UPDATE)
updateProfile : async (req, res) => {
  try {
    let { nome, nomeLoja, nicho, nivelSeller, senha, confirmarSenha } = req.body;
    nome = nome?.trim();
    nomeLoja = nomeLoja?.trim();

    if (!nome || nome.length < 3) return res.status(400).json({ erro: "Nome inválido" });
    if (!nomeLoja || nomeLoja.length < 2) return res.status(400).json({ erro: "Loja inválida" });

    const data = { nome, nomeLoja, nicho: nicho?.trim() || null, nivelSeller: nivelSeller?.trim() || null };

    if (senha || confirmarSenha) {
      if (senha !== confirmarSenha) return res.status(400).json({ erro: "As senhas não coincidem" });
      if (!senhaForte(senha)) return res.status(400).json({ erro: "Senha fraca" });
      data.senha = await bcrypt.hash(senha, 10);
    }

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data,
      select: { id: true, nome: true, nomeLoja: true, email: true, nicho: true, nivelSeller: true }
    });

    res.json({ mensagem: "Perfil atualizado com sucesso", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar perfil" });
  }
}};