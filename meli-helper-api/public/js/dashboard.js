// 🔒 Auth
if (!localStorage.getItem("token")) {
  window.location.href = "index.html"
}

////////////////////////////////////////////////////////////

// 🔑 Headers
function getHeaders() {

  return {

    "Content-Type": "application/json",

    Authorization:
      "Bearer " + localStorage.getItem("token")
  }
}

////////////////////////////////////////////////////////////

// 🔹 Buscar anúncios
async function getAnuncios() {

  const res = await fetch(
    "http://localhost:3000/anuncios?page=1&limit=999",
    {
      headers: getHeaders()
    }
  )

  if (res.status === 401) {

    logout()

    return []
  }

  const data = await res.json()

  return data.data
}

////////////////////////////////////////////////////////////

// 🔹 Carregar dashboard
async function carregarDashboard() {

  const anuncios = await getAnuncios()

  ////////////////////////////////////////////////////////////

  // KPI TOTAL
  document.getElementById("kpiTotal").innerText =
    anuncios.length

  ////////////////////////////////////////////////////////////

  // KPI MÉDIA
  let somaMargem = 0

  anuncios.forEach(a => {

    somaMargem += Number(a.margemLiquida || 0)
  })

  const media =
    anuncios.length > 0
      ? somaMargem / anuncios.length
      : 0

  document.getElementById("kpiMargem").innerText =
    `${media.toFixed(2)}%`

  ////////////////////////////////////////////////////////////

  // KPI RUINS
  const ruins =
    anuncios.filter(a =>
      a.margemLiquida < 10
    )

  document.getElementById("kpiRuins").innerText =
    ruins.length

  ////////////////////////////////////////////////////////////

  // KPI BONS
  const bons =
    anuncios.filter(a =>
      a.margemLiquida >= 18
    )

  document.getElementById("kpiBons").innerText =
    bons.length

  ////////////////////////////////////////////////////////////

  gerarAlertas(anuncios)

  gerarRanking(anuncios)
}

////////////////////////////////////////////////////////////

// 🔥 ALERTAS INTELIGENTES
function gerarAlertas(anuncios) {

  const container =
    document.getElementById("alertasContainer")

  container.innerHTML = ""

  ////////////////////////////////////////////////////////////

  const margemRuim =
    anuncios.filter(a =>
      a.margemLiquida < 10
    )

  if (margemRuim.length > 0) {

    container.innerHTML += `
      <div class="alert alert-danger">

        <strong>
          ${margemRuim.length} produtos
        </strong>

        estão com margem abaixo de 10%.

      </div>
    `
  }

  ////////////////////////////////////////////////////////////

  const freteAlto =
    anuncios.filter(a =>
      a.frete > a.precoVenda * 0.25
    )

  if (freteAlto.length > 0) {

    container.innerHTML += `
      <div class="alert alert-warning">

        <strong>
          ${freteAlto.length} produtos
        </strong>

        possuem frete muito alto.

      </div>
    `
  }

  ////////////////////////////////////////////////////////////

  const semDimensao =
    anuncios.filter(a =>
      !a.largura ||
      !a.altura ||
      !a.comprimento
    )

  if (semDimensao.length > 0) {

    container.innerHTML += `
      <div class="alert alert-info">

        <strong>
          ${semDimensao.length} produtos
        </strong>

        estão sem dimensões cadastradas.

      </div>
    `
  }

  ////////////////////////////////////////////////////////////

  if (container.innerHTML === "") {

    container.innerHTML = `
      <div class="alert alert-success">

        Nenhum alerta encontrado.

      </div>
    `
  }
}

////////////////////////////////////////////////////////////

// 🏆 RANKING
function gerarRanking(anuncios) {

  const ranking =
    anuncios.sort(
      (a, b) =>
        b.margemLiquida - a.margemLiquida
    )

  const top5 = ranking.slice(0, 5)

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

          ${Number(a.margemLiquida).toFixed(2)}%

        </td>

      </tr>
    `
  })
}

////////////////////////////////////////////////////////////

// 🔹 Logout
function logout() {

  localStorage.removeItem("token")

  window.location.href = "index.html"
}

////////////////////////////////////////////////////////////

// 🔥 INIT
carregarDashboard()