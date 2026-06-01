const prisma = require("../database/prismaClient");

// ==========================================================================
// 🔍 BUSCAR CONFIGURAÇÕES DO USUÁRIO
// ==========================================================================
exports.obterConfiguracao = async (req, res) => {
  try {
    const userId = parseInt(typeof req.userId === 'object' ? req.userId.id : req.userId);

    if (!userId) {
      return res.status(401).json({ erro: "Usuário não autenticado." });
    }

    const config = await prisma.configuracao.findUnique({
      where: { userId: userId }
    });

    if (!config) {
      return res.status(200).json({ imposto: 0, custoOperacional: 0});
    }

    return res.status(200).json(config);
  } catch (error) {
    console.error("Erro ao obter configurações:", error);
    return res.status(500).json({ erro: "Erro ao buscar parâmetros operacionais." });
  }
};

// ==========================================================================
// 💾 ATUALIZAR OU CRIAR CONFIGURAÇÕES (Upsert)
// ==========================================================================
exports.atualizarConfiguracao = async (req, res) => {
  try {
    const userId = parseInt(typeof req.userId === 'object' ? req.userId.id : req.userId);
    const { imposto, custoOperacional} = req.body;

    if (!userId) {
      return res.status(401).json({ erro: "Usuário não autenticado." });
    }

    if (imposto < 0 || custoOperacional < 0) {
      return res.status(400).json({ erro: "Os valores não podem ser negativos." });
    }

    const configAtualizada = await prisma.configuracao.upsert({
      where: { userId: userId },
      update: {
        imposto: Number(imposto),
        custoOperacional: Number(custoOperacional),
      },
      create: {
        userId: userId,
        imposto: Number(imposto),
        custoOperacional: Number(custoOperacional),
      },
    });

    return res.status(200).json({
      mensagem: "Configurações de taxas salvas com sucesso!",
      config: configAtualizada
    });
  } catch (error) {
    console.error("Erro ao salvar configurações:", error);
    return res.status(500).json({ erro: "Não foi possível registrar as alterações de taxas." });
  }
};