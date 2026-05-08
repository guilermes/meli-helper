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

let anuncioEditando = null

////////////////////////////////////////////////////////////

// 🔹 Buscar anúncios da API
async function getAnuncios() {
  const res = await fetch("http://localhost:3000/anuncios", {
    headers: getHeaders()
  })

  if (res.status === 401) {
    logout()
    return []
  }

  return res.json()
}

////////////////////////////////////////////////////////////

// 🔹 Montar tabela (COM DATASET)
async function buscarAnuncios() {
  const dados = await getAnuncios()

  const tbody = document.querySelector("#tabela tbody")
  tbody.innerHTML = ""

  dados.forEach(a => {
    const linha = `
      <tr 
        data-id="${a.id}"
        data-nome="${a.nome}"
        data-marca="${a.marca}"
        data-custo="${a.custo}"
        data-preco="${a.precoVenda}"
        data-frete="${a.freteCalculado}"
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
        <td>${a.pesoUtilizado ?? "-"}</td>

        <td>${a.custo}</td>
        <td>${a.precoVenda}</td>
        <td>${a.frete}</td>
        <td>${a.lucroLiquido}</td>
        <td>${a.margemLiquida}%</td>

        <td>
          <button onclick="abrirModal(${a.id})" class="btn btn-sm btn-warning">
            <i class="bi bi-pencil"></i>
          </button>
          <button onclick="excluirAnuncio(${a.id})" class="btn btn-sm btn-danger">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `
    tbody.innerHTML += linha
  })
}

////////////////////////////////////////////////////////////

// 🔹 Abrir modal (SEM USAR tds)
function abrirModal(id) {
  const linha = document.querySelector(`tr[data-id='${id}']`)
  if (!linha) return

  document.getElementById("edit-nome").value = linha.dataset.nome
  document.getElementById("edit-marca").value = linha.dataset.marca

  document.getElementById("edit-custo").value = linha.dataset.custo
  document.getElementById("edit-preco").value = linha.dataset.preco
  document.getElementById("edit-frete").value = linha.dataset.frete

  document.getElementById("edit-largura").value = linha.dataset.largura
  document.getElementById("edit-altura").value = linha.dataset.altura
  document.getElementById("edit-comprimento").value = linha.dataset.comprimento
  document.getElementById("edit-peso").value = linha.dataset.peso

  anuncioEditando = id

  const modalElement = document.getElementById("modal")
  const modal = new bootstrap.Modal(modalElement)
  modal.show()
}

////////////////////////////////////////////////////////////

// 🔹 Fechar modal
function fecharModal() {
  const modal = bootstrap.Modal.getInstance(document.getElementById("modal"))
  if (modal) modal.hide()
}

////////////////////////////////////////////////////////////

// 🔹 Salvar edição (PUT)
async function salvarModal() {
  try {
    const nome = document.getElementById("edit-nome").value
    const marca = document.getElementById("edit-marca").value

    const largura = document.getElementById("edit-largura").value
    const altura = document.getElementById("edit-altura").value
    const comprimento = document.getElementById("edit-comprimento").value
    const peso = document.getElementById("edit-peso").value

    const custo = document.getElementById("edit-custo").value
    const precoVenda = document.getElementById("edit-preco").value
    const frete = document.getElementById("edit-frete").value

    if (!nome) {
      alert("Nome é obrigatório")
      return
    }

    const body = {
      nome,
      marca,
      custo: Number((custo || "0").replace(",", ".")),
      precoVenda: Number((precoVenda || "0").replace(",", ".")),
      frete: Number((frete || "0").replace(",", ".")),

      largura: Number((largura || "0").replace(",", ".")),
      altura: Number((altura || "0").replace(",", ".")),
      comprimento: Number((comprimento || "0").replace(",", ".")),
      peso: Number((peso || "0").replace(",", "."))
    }

    const res = await fetch(`http://localhost:3000/anuncios/${anuncioEditando}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(body)
    })

    if (res.status === 401) {
      logout()
      return
    }

    fecharModal()
    buscarAnuncios()

  } catch (error) {
    console.error(error)
    alert("Erro ao salvar")
  }
}

////////////////////////////////////////////////////////////

// 🔹 Excluir anúncio
async function excluirAnuncio(id) {
  if (!confirm("Deseja excluir?")) return

  try {
    const res = await fetch(`http://localhost:3000/anuncios/${id}`, {
      method: "DELETE",
      headers: getHeaders()
    })

    if (res.status === 401) {
      logout()
      return
    }

    buscarAnuncios()

  } catch (error) {
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