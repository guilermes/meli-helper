// 🔒 Verifica se está logado
if (!localStorage.getItem("token")) {
  window.location.href = "../pages/index.html"
}

// 🔑 Headers com JWT
function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token")
  }
}

// 🔹 Converte número com vírgula para ponto
function parseValor(valor) {
  if (!valor) return 0
  return Number(valor.replace(",", "."))
}

// 🔹 Mostrar mensagem temporária
let timeoutId

function mostrarMensagem(texto, cor = "green") {
  const msg = document.getElementById("msg")

  msg.textContent = texto
  msg.style.color = cor

  clearTimeout(timeoutId)

  timeoutId = setTimeout(() => {
    msg.textContent = ""
  }, 2000)
}

// 🔹 Logout automático
function logout() {
  localStorage.removeItem("token")
  window.location.href = "../pages/index.html"
}

// 🔹 Capturar formulário
const form = document.getElementById("formAnuncio")

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  try {
    const anuncio = {
  idMercadoLivre: document.getElementById("idMercadoLivre").value || null,
  nome: document.getElementById("nome").value,
  marca: document.getElementById("marca").value,
  custo: parseValor(document.getElementById("custo").value),
  precoVenda: parseValor(document.getElementById("precoVenda").value),
  frete: parseValor(document.getElementById("frete").value),

  largura: parseValor(document.getElementById("largura").value),
  altura: parseValor(document.getElementById("altura").value),
  comprimento: parseValor(document.getElementById("comprimento").value),
  peso: parseValor(document.getElementById("peso").value)
}

    const res = await fetch("http://localhost:3000/anuncios", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(anuncio)
    })

    if (res.status === 401) {
      logout()
      return
    }

    if (!res.ok) {
      throw new Error("Erro ao cadastrar")
    }

    form.reset()
    mostrarMensagem("Anúncio cadastrado com sucesso!")

  } catch (error) {
    console.error(error)
    mostrarMensagem("Erro ao cadastrar anúncio", "red")
  }
})