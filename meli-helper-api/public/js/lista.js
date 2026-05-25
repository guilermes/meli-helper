// 🔒 TOKEN
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

let paginaAtual = 1
const limite = 10

let totalPaginas = 1

let anuncioEditando = null

////////////////////////////////////////////////////////////

// 🔥 GET
async function getAnuncios() {

  const pesquisa =
    document.getElementById("pesquisa").value || ""

  const url =
    `http://localhost:3000/anuncios?page=${paginaAtual}&limit=${limite}&search=${pesquisa}`

  const response =
    await fetch(url, {
      headers: getHeaders()
    })

  if (response.status === 401) {

    logout()

    return null
  }

  return response.json()
}

////////////////////////////////////////////////////////////

// 🔥 COR MARGEM
function getClasseMargem(valor) {

  valor = Number(valor || 0)

  if (valor < 10) {
    return "text-danger"
  }

  if (valor < 18) {
    return "text-warning"
  }

  return "text-success"
}

////////////////////////////////////////////////////////////

// 🔥 BUSCAR
async function buscarAnuncios() {

  try {

    const resposta =
      await getAnuncios()

    if (!resposta) return

    const dados =
      resposta.data || []

    totalPaginas =
      resposta.pagination.totalPages || 1

    ////////////////////////////////////////////////////////
    // KPIS

    const total =
      resposta.pagination.total || 0

    const mediaClassico =
      dados.length > 0
        ? dados.reduce(
            (acc, item) =>
              acc +
              Number(item.margemClassico || 0),
            0
          ) / dados.length
        : 0

    const mediaPremium =
      dados.length > 0
        ? dados.reduce(
            (acc, item) =>
              acc +
              Number(item.margemPremium || 0),
            0
          ) / dados.length
        : 0

    const mediaGeral =
      (mediaClassico + mediaPremium) / 2

    const ruinsClassico =
      dados.filter(
        a => Number(a.margemClassico || 0) < 10
      ).length

    const ruinsPremium =
      dados.filter(
        a => Number(a.margemPremium || 0) < 10
      ).length

    ////////////////////////////////////////////////////////

    document.getElementById("kpiTotal").innerText =
      total

    document.getElementById("kpiMediaClassico").innerText =
      `${mediaClassico.toFixed(2)}%`

    document.getElementById("kpiMediaPremium").innerText =
      `${mediaPremium.toFixed(2)}%`

    document.getElementById("kpiMediaGeral").innerText =
      `${mediaGeral.toFixed(2)}%`

    document.getElementById("kpiRuinsClassico").innerText =
      ruinsClassico

    document.getElementById("kpiRuinsPremium").innerText =
      ruinsPremium

    ////////////////////////////////////////////////////////

    const tbody =
      document.querySelector("#tabela tbody")

    tbody.innerHTML = ""

    ////////////////////////////////////////////////////////

    dados.forEach(a => {

      const linha = `

        <tr

          data-id="${a.id}"

          data-nome="${a.nome}"
          data-marca="${a.marca}"

          data-custo="${a.custo}"
          data-preco="${a.precoVenda}"
          data-frete="${a.frete}"

          data-peso="${a.peso || ""}"

          data-largura="${a.largura || ""}"
          data-altura="${a.altura || ""}"
          data-comprimento="${a.comprimento || ""}"
        >

          <td>${a.id}</td>

          <td class="text-start">

            <div class="fw-semibold">
              ${a.nome}
            </div>

          </td>

          <td>${a.marca}</td>

          <td>${a.largura ?? "-"}</td>

          <td>${a.altura ?? "-"}</td>

          <td>${a.comprimento ?? "-"}</td>

          <td>
            ${Number(a.peso || 0).toFixed(3)}
          </td>

          <td>
            ${Number(a.pesoUtilizado || 0).toFixed(3)}
          </td>

          <td>
            R$ ${Number(a.custo || 0).toFixed(2)}
          </td>

          <td>
            R$ ${Number(a.precoVenda || 0).toFixed(2)}
          </td>

          <td>
            R$ ${Number(a.freteCalculado || a.frete || 0).toFixed(2)}
          </td>

          <!-- CLASSICO -->

          <td class="fw-semibold">
            R$ ${Number(a.lucroClassico || 0).toFixed(2)}
          </td>

          <td class="${getClasseMargem(a.margemClassico)} fw-bold">
            ${Number(a.margemClassico || 0).toFixed(2)}%
          </td>

          <!-- PREMIUM -->

          <td class="fw-semibold">
            R$ ${Number(a.lucroPremium || 0).toFixed(2)}
          </td>

          <td class="${getClasseMargem(a.margemPremium)} fw-bold">
            ${Number(a.margemPremium || 0).toFixed(2)}%
          </td>

          <!-- AÇÕES -->

          <td>

            <div class="d-flex justify-content-center gap-2">

              <button
                onclick="abrirModal(${a.id})"
                class="btn btn-warning btn-sm"
              >
                <i class="bi bi-pencil"></i>
              </button>

              <button
                onclick="excluirAnuncio(${a.id})"
                class="btn btn-danger btn-sm"
              >
                <i class="bi bi-trash"></i>
              </button>

            </div>

          </td>

        </tr>
      `

      tbody.innerHTML += linha
    })

    atualizarPaginacao()

  }
  catch (error) {

    console.error(error)

    alert("Erro ao carregar anúncios")
  }
}

////////////////////////////////////////////////////////////

// 🔥 MODAL
function abrirModal(id) {

  const linha =
    document.querySelector(
      `tr[data-id='${id}']`
    )

  if (!linha) return

  document.getElementById("edit-nome").value =
    linha.dataset.nome

  document.getElementById("edit-marca").value =
    linha.dataset.marca

  document.getElementById("edit-custo").value =
    linha.dataset.custo

  document.getElementById("edit-preco").value =
    linha.dataset.preco

  document.getElementById("edit-frete").value =
    linha.dataset.frete

  document.getElementById("edit-peso").value =
    linha.dataset.peso

  document.getElementById("edit-largura").value =
    linha.dataset.largura

  document.getElementById("edit-altura").value =
    linha.dataset.altura

  document.getElementById("edit-comprimento").value =
    linha.dataset.comprimento

  anuncioEditando = id

  const modal =
    new bootstrap.Modal(
      document.getElementById("modal")
    )

  modal.show()
}

////////////////////////////////////////////////////////////

// 🔥 FECHAR
function fecharModal() {

  const modal =
    bootstrap.Modal.getInstance(
      document.getElementById("modal")
    )

  if (modal) {
    modal.hide()
  }
}

////////////////////////////////////////////////////////////

// 🔥 SALVAR
async function salvarModal() {

  try {

    const body = {

      nome:
        document.getElementById("edit-nome").value,

      marca:
        document.getElementById("edit-marca").value,

      custo:
        Number(
          document.getElementById("edit-custo").value || 0
        ),

      precoVenda:
        Number(
          document.getElementById("edit-preco").value || 0
        ),

      frete:
        Number(
          document.getElementById("edit-frete").value || 0
        ),

      peso:
        Number(
          document.getElementById("edit-peso").value || 0
        ),

      largura:
        Number(
          document.getElementById("edit-largura").value || 0
        ),

      altura:
        Number(
          document.getElementById("edit-altura").value || 0
        ),

      comprimento:
        Number(
          document.getElementById("edit-comprimento").value || 0
        )
    }

    await fetch(
      `http://localhost:3000/anuncios/${anuncioEditando}`,
      {

        method: "PUT",

        headers: getHeaders(),

        body: JSON.stringify(body)
      }
    )

    fecharModal()

    buscarAnuncios()

  }
  catch (error) {

    console.error(error)

    alert("Erro ao salvar")
  }
}

////////////////////////////////////////////////////////////

// 🔥 EXCLUIR
async function excluirAnuncio(id) {

  const confirmar =
    confirm("Deseja excluir?")

  if (!confirmar) return

  try {

    await fetch(
      `http://localhost:3000/anuncios/${id}`,
      {

        method: "DELETE",

        headers: getHeaders()
      }
    )

    buscarAnuncios()

  }
  catch (error) {

    console.error(error)

    alert("Erro ao excluir")
  }
}

////////////////////////////////////////////////////////////

// 🔥 PAGINAÇÃO
function atualizarPaginacao() {

  document.getElementById("infoPaginacao").innerText =
    `Página ${paginaAtual} de ${totalPaginas}`

  document.getElementById("btnAnterior").disabled =
    paginaAtual <= 1

  document.getElementById("btnProximo").disabled =
    paginaAtual >= totalPaginas
}

////////////////////////////////////////////////////////////

document
  .getElementById("btnAnterior")
  .addEventListener("click", () => {

    if (paginaAtual > 1) {

      paginaAtual--

      buscarAnuncios()
    }
  })

////////////////////////////////////////////////////////////

document
  .getElementById("btnProximo")
  .addEventListener("click", () => {

    if (paginaAtual < totalPaginas) {

      paginaAtual++

      buscarAnuncios()
    }
  })

////////////////////////////////////////////////////////////

document
  .getElementById("pesquisa")
  .addEventListener("input", () => {

    paginaAtual = 1

    buscarAnuncios()
  })

////////////////////////////////////////////////////////////

// 🔥 LOGOUT
function logout() {

  localStorage.removeItem("token")

  window.location.href = "index.html"
}

////////////////////////////////////////////////////////////

// 🔥 INICIAR
buscarAnuncios()