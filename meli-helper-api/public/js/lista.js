// 🔒 Verifica se está logado
if (!localStorage.getItem("token")) {
  window.location.href = "index.html"
}

// 🔑 Headers com JWT
function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token")
  }
}

////////////////////////////////////////////////////////////

// 🔥 ESTADOS DA PAGINAÇÃO
let paginaAtual = 1
const limite = 10

let totalPaginas = 1

let anuncioEditando = null

////////////////////////////////////////////////////////////

// 🔹 Buscar anúncios da API
async function getAnuncios() {

  const pesquisa =
    document.getElementById("pesquisa").value || ""

  const url =
    `http://localhost:3000/anuncios?page=${paginaAtual}&limit=${limite}&search=${pesquisa}`

  const res = await fetch(url, {
    headers: getHeaders()
  })

  if (res.status === 401) {
    logout()
    return null
  }

  return res.json()
}

////////////////////////////////////////////////////////////

// 🔹 Buscar anúncios
async function buscarAnuncios() {

  const resposta = await getAnuncios()

  if (!resposta) return

  const dados = resposta.data

  totalPaginas = resposta.pagination.totalPages

  ////////////////////////////////////////////////////////////
  // 🔥 KPI CARDS

  const totalProdutos =
    resposta.pagination.total

  const margemMedia =
    dados.length > 0
      ? dados.reduce(
          (acc, item) =>
            acc + Number(item.margemLiquida),
          0
        ) / dados.length
      : 0

  const produtosRuins =
    dados.filter(
      a => Number(a.margemLiquida) < 10
    ).length

  const produtosBons =
    dados.filter(
      a => Number(a.margemLiquida) >= 18
    ).length

  document.getElementById("kpiTotal").innerText =
    totalProdutos

  document.getElementById("kpiMargem").innerText =
    `${margemMedia.toFixed(2)}%`

  document.getElementById("kpiRuins").innerText =
    produtosRuins

  document.getElementById("kpiBons").innerText =
    produtosBons

  ////////////////////////////////////////////////////////////

  const tbody =
    document.querySelector("#tabela tbody")

  tbody.innerHTML = ""

  dados.forEach(a => {

    // 🔥 COR DA MARGEM
    let classeMargem = "text-success"

    if (a.margemLiquida < 10) {
      classeMargem = "text-danger"
    }
    else if (a.margemLiquida < 18) {
      classeMargem = "text-warning"
    }

    const linha = `
      <tr
        data-id="${a.id}"
        data-nome="${a.nome}"
        data-marca="${a.marca}"

        data-custo="${a.custo}"
        data-preco="${a.precoVenda}"
        data-frete="${a.frete}"

        data-largura="${a.largura ?? ""}"
        data-altura="${a.altura ?? ""}"
        data-comprimento="${a.comprimento ?? ""}"
        data-peso="${a.peso ?? ""}"
      >

        <td>${a.id}</td>

        <td>${a.nome}</td>

        <td>${a.marca}</td>

        <td>${a.largura ?? "-"}</td>

        <td>${a.altura ?? "-"}</td>

        <td>${a.comprimento ?? "-"}</td>

        <td>${a.peso ?? "-"}</td>

        <td>
          ${a.pesoUtilizado?.toFixed(3) ?? "-"}
        </td>

        <td>
          R$ ${Number(a.custo).toFixed(2)}
        </td>

        <td>
          R$ ${Number(a.precoVenda).toFixed(2)}
        </td>

        <td>
          R$ ${Number(a.frete).toFixed(2)}
        </td>

        <td>
          R$ ${Number(a.lucroLiquido).toFixed(2)}
        </td>

        <td class="${classeMargem} fw-bold">
          ${Number(a.margemLiquida).toFixed(2)}%
        </td>

        <td>

          <button
            onclick="abrirModal(${a.id})"
            class="btn btn-sm btn-warning"
          >
            <i class="bi bi-pencil"></i>
          </button>

          <button
            onclick="excluirAnuncio(${a.id})"
            class="btn btn-sm btn-danger"
          >
            <i class="bi bi-trash"></i>
          </button>

        </td>

      </tr>
    `

    tbody.innerHTML += linha
  })

  atualizarPaginacao()
}

////////////////////////////////////////////////////////////

// 🔹 Atualizar paginação
function atualizarPaginacao() {

  document.getElementById("infoPaginacao").innerText =
    `Página ${paginaAtual} de ${totalPaginas}`

  document.getElementById("btnAnterior").disabled =
    paginaAtual <= 1

  document.getElementById("btnProximo").disabled =
    paginaAtual >= totalPaginas
}

////////////////////////////////////////////////////////////

// 🔹 Botão anterior
document
  .getElementById("btnAnterior")
  .addEventListener("click", () => {

    if (paginaAtual > 1) {

      paginaAtual--

      buscarAnuncios()
    }
  })

////////////////////////////////////////////////////////////

// 🔹 Botão próximo
document
  .getElementById("btnProximo")
  .addEventListener("click", () => {

    if (paginaAtual < totalPaginas) {

      paginaAtual++

      buscarAnuncios()
    }
  })

////////////////////////////////////////////////////////////

// 🔹 Pesquisa dinâmica
document
  .getElementById("pesquisa")
  .addEventListener("input", () => {

    paginaAtual = 1

    buscarAnuncios()
  })

////////////////////////////////////////////////////////////

// 🔹 Abrir modal
function abrirModal(id) {

  const linha =
    document.querySelector(`tr[data-id='${id}']`)

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

  document.getElementById("edit-largura").value =
    linha.dataset.largura

  document.getElementById("edit-altura").value =
    linha.dataset.altura

  document.getElementById("edit-comprimento").value =
    linha.dataset.comprimento

  document.getElementById("edit-peso").value =
    linha.dataset.peso

  anuncioEditando = id

  const modalElement =
    document.getElementById("modal")

  const modal =
    new bootstrap.Modal(modalElement)

  modal.show()
}

////////////////////////////////////////////////////////////

// 🔹 Fechar modal
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

// 🔹 Salvar edição
async function salvarModal() {

  try {

    const nome =
      document.getElementById("edit-nome").value

    const marca =
      document.getElementById("edit-marca").value

    const largura =
      document.getElementById("edit-largura").value

    const altura =
      document.getElementById("edit-altura").value

    const comprimento =
      document.getElementById("edit-comprimento").value

    const peso =
      document.getElementById("edit-peso").value

    const custo =
      document.getElementById("edit-custo").value

    const precoVenda =
      document.getElementById("edit-preco").value

    const frete =
      document.getElementById("edit-frete").value

    if (!nome) {
      alert("Nome é obrigatório")
      return
    }

    const body = {

      nome,
      marca,

      custo: Number(
        (custo || "0").replace(",", ".")
      ),

      precoVenda: Number(
        (precoVenda || "0").replace(",", ".")
      ),

      frete: Number(
        (frete || "0").replace(",", ".")
      ),

      largura: Number(
        (largura || "0").replace(",", ".")
      ),

      altura: Number(
        (altura || "0").replace(",", ".")
      ),

      comprimento: Number(
        (comprimento || "0").replace(",", ".")
      ),

      peso: Number(
        (peso || "0").replace(",", ".")
      )
    }

    const res = await fetch(
      `http://localhost:3000/anuncios/${anuncioEditando}`,
      {
        method: "PUT",

        headers: getHeaders(),

        body: JSON.stringify(body)
      }
    )

    if (res.status === 401) {
      logout()
      return
    }

    fecharModal()

    buscarAnuncios()

  }
  catch (error) {

    console.error(error)

    alert("Erro ao salvar")
  }
}

////////////////////////////////////////////////////////////

// 🔹 Excluir anúncio
async function excluirAnuncio(id) {

  if (!confirm("Deseja excluir?")) {
    return
  }

  try {

    const res = await fetch(
      `http://localhost:3000/anuncios/${id}`,
      {
        method: "DELETE",
        headers: getHeaders()
      }
    )

    if (res.status === 401) {
      logout()
      return
    }

    buscarAnuncios()

  }
  catch (error) {

    console.error(error)

    alert("Erro ao excluir")
  }
}

////////////////////////////////////////////////////////////

// 🔹 Logout
function logout() {

  localStorage.removeItem("token")

  window.location.href = "index.html"
}

////////////////////////////////////////////////////////////

// 🔥 INICIAR
buscarAnuncios()