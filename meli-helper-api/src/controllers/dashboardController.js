const prisma = require("../database/prismaClient");
const anuncioService = require("../services/anuncioService");

exports.getDashboardMetrics = async (req, res) => {
  try {
    const idDoUsuarioLogado = req.userId;

    // 🛡️ Barreira de segurança contra sessões inválidas
    if (!idDoUsuarioLogado) {
      return res.status(401).json({ erro: "Usuário não autenticado no sistema." });
    }

    // 1. 🔍 BUSCA OS ANÚNCIOS BRUTOS DO USUÁRIO NO SQLITE via PRISMA
    // (Nota: Garanta que o campo de relação no seu schema do Anúncio seja 'userId')
    const anunciosBrutos = await prisma.anuncio.findMany({
      where: {
        userId: idDoUsuarioLogado
      }
    });

    // 2. 🔄 PROCESSA OS CÁLCULOS UTILIZANDO O SEU ANUNCIOSERVICE
    // Usamos Promise.all porque a função 'calcularValores' é assíncrona
    const anunciosCalculados = await Promise.all(
      anunciosBrutos.map(async (anuncio) => {
        const valoresCalculados = await anuncioService.calcularValores(anuncio, idDoUsuarioLogado);
        
        return {
          ...anuncio,
          // Incorpora freteCalculado, pesoUtilizado, lucro e margemPorcentagem
          ...valoresCalculados 
        };
      })
    );

    // 3. 📊 PROCESSAMENTO DAS MÉTRICAS OPERACIONAIS PARA O DASHBOARD
    const totalAnuncios = anunciosCalculados.length;
    
    // Conforme a regra do seu service: tipoAnuncio === "PREMIUM"
    const classicos = anunciosCalculados.filter(a => a.tipoAnuncio !== "PREMIUM");
    const premiums = anunciosCalculados.filter(a => a.tipoAnuncio === "PREMIUM");

    const pctClassico = totalAnuncios > 0 ? (classicos.length / totalAnuncios) * 100 : 0;
    const pctPremium = totalAnuncios > 0 ? (premiums.length / totalAnuncios) * 100 : 0;

    // Regra operacional: Premium com margem menor que 12% está crítico
    const ruinsPrem = premiums.filter(a => a.margemPorcentagem < 12).length;
    const bonsPrem = premiums.filter(a => a.margemPorcentagem >= 12).length;

    // Cálculo do Frete Médio com base no retorno real do seu service
    const comFrete = anunciosCalculados.filter(a => a.freteCalculado > 0);
    const somaFrete = comFrete.reduce((acc, curr) => acc + curr.freteCalculado, 0);
    const freteMedio = comFrete.length > 0 ? somaFrete / comFrete.length : 0;

    // 🏆 Ranking Top 4 Melhores Margens calculadas pelo Service
    const rankingMargem = [...anunciosCalculados]
      .sort((a, b) => b.margemPorcentagem - a.margemPorcentagem)
      .slice(0, 4)
      .map(a => ({
        id: a.id,
        nome: a.titulo || a.nome || "Produto Sem Título", // Suporta campo titulo ou nome
        margem: a.margemPorcentagem
      }));

    // 🔔 4. MONTAGEM DINÂMICA DE ALERTAS E INSIGHTS
    const alertas = [];
    if (ruinsPrem > 0) {
      alertas.push({
        id: 1,
        tipo: "warning",
        mensagem: `Atenção: Você possui ${ruinsPrem} anúncio(s) Premium operando com margem crítica (abaixo de 12%).`
      });
    } else if (totalAnuncios > 0) {
      alertas.push({
        id: 1,
        tipo: "info",
        mensagem: "Excelente! Todos os seus anúncios Premium estão operando com margens saudáveis."
      });
    }

    const insights = [
      `Sua carteira operacional atual é composta por ${Math.round(pctPremium)}% de anúncios Premium.`
    ];

    if (rankingMargem.length > 0) {
      insights.push(`O item "${rankingMargem[0].nome}" possui o melhor desempenho de lucro com ${rankingMargem[0].margem.toFixed(1)}% de margem.`);
    }

    // 📤 5. RETORNO DO JSON COMPACTO PARA O FRONTEND
    return res.status(200).json({
      kpis: {
        totalProdutos: totalAnuncios,
        mediaClassico: Math.round(pctClassico),
        mediaPremium: Math.round(pctPremium),
        ruinsPremium: ruinsPrem,
        bonsPremium: bonsPrem,
        freteMedio: Number(freteMedio.toFixed(2))
      },
      alertas,
      rankingMargem,
      insights
    });

  } catch (error) {
    console.error("Erro na geração da dashboard (Controller):", error);
    return res.status(500).json({ erro: "Falha interna ao processar métricas analíticas da dashboard." });
  }
};