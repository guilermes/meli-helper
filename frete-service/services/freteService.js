// 🔹 calcular cubagem
function calcularCubagem({ largura, altura, comprimento }) {
  return (largura * altura * comprimento) / 6000
}

// 🔹 escolher peso válido
function obterPesoUtilizado({ peso, cubagem }) {
  return Math.max(peso, cubagem)
}

// 🔹 faixas de preço
function getFaixaPreco(preco) {
  if (preco <= 18.99) return 0
  if (preco <= 48.99) return 1
  if (preco <= 78.99) return 2
  if (preco <= 99.99) return 3
  if (preco <= 119.99) return 4
  if (preco <= 149.99) return 5
  if (preco <= 199.99) return 6
  return 7
}

// 🔹 tabela simplificada (você pode expandir depois)
const tabela = [
  { max: 0.3, valores: [5.65,6.55,7.75,12.35,14.35,16.45,18.45,20.95] },
  { max: 0.5, valores: [5.95,6.65,7.85,13.25,15.45,17.65,19.85,22.55] },
  { max: 1,   valores: [6.05,6.75,7.95,13.85,16.15,18.45,20.75,23.65] },
  { max: 2,   valores: [6.25,6.95,8.15,14.45,16.85,19.25,21.65,24.65] },
  { max: 5,   valores: [6.55,8.35,9.75,18.45,21.55,24.65,27.75,30.75] },
  { max: 10,  valores: [7.05,9.55,10.95,41.25,48.05,54.95,61.75,68.65] },
  { max: 20,  valores: [7.45,10.55,11.95,54.75,63.85,72.95,82.05,91.15] },
  { max: 50,  valores: [7.95,11.55,12.75,70.25,81.05,92.05,102.55,110.75] },
  { max: 100, valores: [8.45,12.55,13.75,106.55,123.95,139.55,155.55,167.95] },
  { max: Infinity, valores: [8.75,12.95,14.35,166.15,192.45,217.55,242.55,261.95] }
]

// 🔹 cálculo final
function calcularFrete({ peso, largura, altura, comprimento, precoVenda }) {
  const cubagem = calcularCubagem({ largura, altura, comprimento })
  const pesoUtilizado = obterPesoUtilizado({ peso, cubagem })

  const faixaPreco = getFaixaPreco(precoVenda)

  const faixaPeso = tabela.find(f => pesoUtilizado <= f.max)

  const frete = faixaPeso.valores[faixaPreco]

  return Number(frete.toFixed(2))
}

module.exports = {
  calcularFrete
}