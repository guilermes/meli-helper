const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

// 🌟 Ativa o modo WAL no SQLite para permitir leituras e escritas simultâneas sem travar
async function configurarBanco() {
  try {
    await prisma.$queryRawUnsafe(`PRAGMA journal_mode=WAL;`);
  } catch (error) {
    console.error('Erro ao ativar o modo WAL no SQLite:', error);
  }
}
configurarBanco();

module.exports = prisma