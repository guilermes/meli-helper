// 🔒 Verifica login
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

// 🔹 Mostrar mensagem temporária
let timeoutId

function mostrarMensagem(texto, cor = "green") {
  const msg = document.getElementById("msg")

  if (!msg) return

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

////////////////////////////////////////////////////////////

// 🔹 Buscar configuração da API
async function carregarConfiguracao() {
  try {
    const res = await fetch("http://localhost:3000/config", {
      headers: getHeaders()
    })

    if (res.status === 401) {
      logout()
      return
    }

    const data = await res.json()

    document.getElementById("confComissao").textContent = data.comissao ?? 0
    document.getElementById("confImposto").textContent = data.imposto ?? 0
    document.getElementById("confCusto").textContent = data.custoOperacional ?? 0

  } catch (error) {
    console.error(error)
    mostrarMensagem("Erro ao carregar configuração", "red")
  }
}

////////////////////////////////////////////////////////////

// 🔹 Capturar formulário
const form = document.getElementById("formConfig")

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    try {
      const data = {
        comissao: Number(document.getElementById("comissao").value) || 0,
        imposto: Number(document.getElementById("imposto").value) || 0,
        custoOperacional: Number(document.getElementById("custoOperacional").value) || 0
      }

      const res = await fetch("http://localhost:3000/config", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data)
      })

      if (res.status === 401) {
        logout()
        return
      }

      if (!res.ok) {
        throw new Error("Erro ao salvar")
      }

      mostrarMensagem("Configuração salva com sucesso!")

      // 🔥 Atualiza os valores exibidos
      carregarConfiguracao()

      form.reset()

    } catch (error) {
      console.error(error)
      mostrarMensagem("Erro ao salvar configuração", "red")
    }
  })
}

////////////////////////////////////////////////////////////

// 🔥 Carrega ao abrir
carregarConfiguracao()