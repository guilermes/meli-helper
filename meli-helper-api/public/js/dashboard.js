// 🔒 AUTH
const token =
  localStorage.getItem("token")

if (!token) {
  window.location.href = "index.html"
}

////////////////////////////////////////////////////////////

// 🔑 HEADERS
function getHeaders() {

  return {

    "Content-Type": "application/json",

    Authorization:
      "Bearer " + token
  }
}

////////////////////////////////////////////////////////////

// 🔹 GET ANÚNCIOS
async function getAnuncios() {

  try {

    const response =
      await fetch(
        "http://localhost:3000/anuncios?page=1&limit=999",
        {
          headers: getHeaders()
        }
      )

    if (response.status === 401) {

      logout()

      return []
    }

    const data =
      await response.json()

    return data.data || []

  }
  catch (error) {

    console.error(error)

    return []
  }
}

////////////////////////////////////////////////////////////

// 🔥 DASHBOARD
async function carregarDashboard() {

  const anuncios =
    await getAnuncios()

  ////////////////////////////////////////////////////////////
  // TOTAL

  document.getElementById("kpiTotal").innerText =
    anuncios.length

  ////////////////////////////////////////////////////////////
  // MÉDIAS

  const mediaClassico =
    anuncios.filter(a => a.tipoAnuncio === "CLASSICO").length > 0
      ? anuncios
          .filter(a => a.tipoAnuncio === "CLASSICO")
          .reduce(
            (acc, item) =>
              acc + Number(item.margem || 0),
            0
          ) /
        anuncios.filter(a => a.tipoAnuncio === "CLASSICO").length
      : 0

  const mediaPremium =
    anuncios.filter(a => a.tipoAnuncio === "PREMIUM").length > 0
      ? anuncios
          .filter(a => a.tipoAnuncio === "PREMIUM")
          .reduce(
            (acc, item) =>
              acc + Number(item.margem || 0),
            0
          ) /
        anuncios.filter(a => a.tipoAnuncio === "PREMIUM").length
      : 0

  ////////////////////////////////////////////////////////////
  // RUINS / BONS

  const ruinsPremium =
    anuncios.filter(
      a =>
        a.tipoAnuncio === "PREMIUM" &&
        Number(a.margem || 0) < 10
    ).length

  const bonsPremium =
    anuncios.filter(
      a =>
        a.tipoAnuncio === "PREMIUM" &&
        Number(a.margem || 0) >= 18
    ).length

  ////////////////////////////////////////////////////////////

  document.getElementById("kpiMediaClassico").innerText =
    `${mediaClassico.toFixed(2)}%`

  document.getElementById("kpiMediaPremium").innerText =
    `${mediaPremium.toFixed(2)}%`

  document.getElementById("kpiRuins").innerText =
    ruinsPremium

  document.getElementById("kpiBons").innerText =
    bonsPremium

  ////////////////////////////////////////////////////////////
  // FRETE MÉDIO

  const freteTotal =
    anuncios.length > 0
      ? anuncios.reduce(
          (acc, item) =>
            acc +
            Number(item.frete || 0),
          0
        ) / anuncios.length
      : 0

  document.getElementById("kpiFrete").innerText =
    `R$ ${freteTotal.toFixed(2)}`

  ////////////////////////////////////////////////////////////

  gerarAlertas(anuncios)

  gerarRanking(anuncios)

  gerarInsights(anuncios)
}

////////////////////////////////////////////////////////////

// 🔥 ALERTAS
function gerarAlertas(anuncios) {

  const container =
    document.getElementById("alertasContainer")

  container.innerHTML = ""

  ////////////////////////////////////////////////////////////

  const ruinsPremium =
    anuncios.filter(
      a =>
        a.tipoAnuncio === "PREMIUM" &&
        Number(a.margem || 0) < 10
    )

  if (ruinsPremium.length > 0) {

    container.innerHTML += `
      <div class="alert alert-danger">

        <i class="bi bi-exclamation-triangle-fill me-2"></i>

        <strong>
          ${ruinsPremium.length} produtos
        </strong>

        possuem margem premium abaixo de 10%.

      </div>
    `
  }

  ////////////////////////////////////////////////////////////

  const freteAlto =
    anuncios.filter(
      a =>
        Number(a.frete || 0) >
        Number(a.precoVenda || 0) * 0.25
    )

  if (freteAlto.length > 0) {

    container.innerHTML += `
      <div class="alert alert-warning">

        <i class="bi bi-truck me-2"></i>

        <strong>
          ${freteAlto.length} produtos
        </strong>

        possuem frete acima de 25% do preço de venda.

      </div>
    `
  }

  ////////////////////////////////////////////////////////////

  const semMedidas =
    anuncios.filter(
      a =>
        !a.largura ||
        !a.altura ||
        !a.comprimento
    )

  if (semMedidas.length > 0) {

    container.innerHTML += `
      <div class="alert alert-info">

        <i class="bi bi-box-seam me-2"></i>

        <strong>
          ${semMedidas.length} produtos
        </strong>

        estão sem dimensões completas.

      </div>
    `
  }

  ////////////////////////////////////////////////////////////

  if (container.innerHTML === "") {

    container.innerHTML = `
      <div class="alert alert-success">

        <i class="bi bi-check-circle-fill me-2"></i>

        Nenhum alerta encontrado.

      </div>
    `
  }
}

////////////////////////////////////////////////////////////

// 🏆 RANKING
function gerarRanking(anuncios) {

  const ranking =
    [...anuncios].sort(
      (a, b) =>
        Number(b.margem || 0) -
        Number(a.margem || 0)
    )

  const top5 =
    ranking.slice(0, 5)

  const tbody =
    document.getElementById("rankingBody")

  tbody.innerHTML = ""

  top5.forEach((a, index) => {

    tbody.innerHTML += `
      <tr>

        <td>
          #${index + 1}
        </td>

        <td>
          ${a.nome}
        </td>

        <td class="text-success fw-bold">
          ${Number(a.margem || 0).toFixed(2)}%
        </td>

      </tr>
    `
  })
}

////////////////////////////////////////////////////////////

// 💡 INSIGHTS
function gerarInsights(anuncios) {

  const insights =
    document.getElementById("insightsContainer")

  insights.innerHTML = ""

  ////////////////////////////////////////////////////////////

  const ticketMedio =
    anuncios.length > 0
      ? anuncios.reduce(
          (acc, item) =>
            acc +
            Number(item.precoVenda || 0),
          0
        ) / anuncios.length
      : 0

  insights.innerHTML += `
    <li class="list-group-item">

      <i class="bi bi-cash-stack text-success me-2"></i>

      Ticket médio dos produtos:
      <strong>
        R$ ${ticketMedio.toFixed(2)}
      </strong>

    </li>
  `

  ////////////////////////////////////////////////////////////

  const maisPesado =
    [...anuncios].sort(
      (a, b) =>
        Number(b.pesoUtilizado || 0) -
        Number(a.pesoUtilizado || 0)
    )[0]

  if (maisPesado) {

    insights.innerHTML += `
      <li class="list-group-item">

        <i class="bi bi-box2-heart text-warning me-2"></i>

        Produto mais pesado:
        <strong>
          ${maisPesado.nome}
        </strong>

        (${Number(maisPesado.pesoUtilizado || 0).toFixed(2)}kg)

      </li>
    `
  }

  ////////////////////////////////////////////////////////////

  const melhor =
    [...anuncios].sort(
      (a, b) =>
        Number(b.margem || 0) -
        Number(a.margem || 0)
    )[0]

  if (melhor) {

    insights.innerHTML += `
      <li class="list-group-item">

        <i class="bi bi-trophy-fill text-primary me-2"></i>

        Melhor margem:
        <strong>
          ${melhor.nome}
        </strong>

        (${Number(melhor.margem || 0).toFixed(2)}%)

      </li>
    `
  }
}

////////////////////////////////////////////////////////////

// 🚚 CALCULADORA DE FRETE
async function calcularFreteRapido() {

  const resultadoEl =
    document.getElementById("resultadoFrete")

  try {

    const precoVenda =
      Number(document.getElementById("calcPreco").value || 0)

    const largura =
      Number(document.getElementById("calcLargura").value || 0)

    const altura =
      Number(document.getElementById("calcAltura").value || 0)

    const comprimento =
      Number(document.getElementById("calcComprimento").value || 0)

    const peso =
      Number(document.getElementById("calcPeso").value || 0)

    // Validação básica
    if (!precoVenda || !peso || !largura || !altura || !comprimento) {

      resultadoEl.innerHTML = `
        <div class="alert alert-warning mb-0">
          <i class="bi bi-exclamation-circle me-2"></i>
          Preencha todos os campos antes de calcular.
        </div>
      `

      return
    }

    resultadoEl.innerHTML = `
      <div class="alert alert-secondary mb-0">
        <i class="bi bi-hourglass-split me-2"></i>
        Calculando...
      </div>
    `

    const body = {
      precoVenda,
      largura,
      altura,
      comprimento,
      peso
    }

    // ✅ Chama a API (porta 3000) que faz proxy para o frete-service (porta 4000)
    // Evita CORS pois browser → API → microserviço (server to server)
    const response =
      await fetch(
        "http://localhost:3000/anuncios/calcular-frete",
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(body)
        }
      )

    if (!response.ok) {

      throw new Error(`HTTP ${response.status}`)
    }

    const data =
      await response.json()

    resultadoEl.innerHTML = `
      <div class="alert alert-success mb-0">
        <strong>Frete estimado:</strong>
        R$ ${Number(data.frete || 0).toFixed(2)}
      </div>
    `
  }
  catch (error) {

    console.error(error)

    resultadoEl.innerHTML = `
      <div class="alert alert-danger mb-0">
        <i class="bi bi-wifi-off me-2"></i>
        Erro ao calcular frete. Verifique se a API está rodando.
      </div>
    `
  }
}

////////////////////////////////////////////////////////////

// 🔒 LOGOUT
function logout() {

  localStorage.removeItem("token")

  window.location.href = "index.html"
}

////////////////////////////////////////////////////////////

// 🚀 INIT
carregarDashboard()