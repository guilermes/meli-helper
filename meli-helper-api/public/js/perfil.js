const token =
  localStorage.getItem("token")

if (!token) {
  window.location.href = "index.html"
}

const form =
  document.getElementById("formPerfil")

const msg =
  document.getElementById("msg")

let timeoutId

function getHeaders() {

  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token
  }
}

function toggleSenha(inputId, btn) {

  const input =
    document.getElementById(inputId)

  const icon =
    btn.querySelector("i")

  if (input.type === "password") {

    input.type = "text"
    icon.className = "bi bi-eye-slash"
  }
  else {

    input.type = "password"
    icon.className = "bi bi-eye"
  }
}

function mostrarMensagem(texto, cor = "green") {

  msg.textContent = texto
  msg.style.color = cor

  clearTimeout(timeoutId)

  timeoutId = setTimeout(() => {
    msg.textContent = ""
  }, 3000)
}

function logout() {

  localStorage.removeItem("token")
  window.location.href = "index.html"
}

async function carregarPerfil() {

  try {

    const res =
      await fetch(
        "http://localhost:3000/profile",
        { headers: getHeaders() }
      )

    if (res.status === 401) {
      logout()
      return
    }

    if (!res.ok) {
      throw new Error("Erro ao carregar perfil")
    }

    const user = await res.json()

    document.getElementById("nome").value = user.nome || ""
    document.getElementById("nomeLoja").value = user.nomeLoja || ""
    document.getElementById("email").value = user.email || ""
    document.getElementById("nicho").value = user.nicho || ""
    document.getElementById("nivelSeller").value = user.nivelSeller || ""
  }
  catch (error) {

    console.error(error)
    mostrarMensagem("Erro ao carregar perfil", "red")
  }
}

form.addEventListener("submit", async (e) => {

  e.preventDefault()

  const senha =
    document.getElementById("senha").value

  const confirmarSenha =
    document.getElementById("confirmarSenha").value

  if (senha || confirmarSenha) {

    if (senha !== confirmarSenha) {

      mostrarMensagem("As senhas não coincidem", "red")
      return
    }
  }

  const body = {

    nome:
      document.getElementById("nome").value,

    nomeLoja:
      document.getElementById("nomeLoja").value,

    nicho:
      document.getElementById("nicho").value,

    nivelSeller:
      document.getElementById("nivelSeller").value
  }

  if (senha) {
    body.senha = senha
    body.confirmarSenha = confirmarSenha
  }

  try {

    const res =
      await fetch(
        "http://localhost:3000/profile",
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

    const data = await res.json()

    if (!res.ok) {

      mostrarMensagem(data.erro || "Erro ao salvar", "red")
      return
    }

    document.getElementById("senha").value = ""
    document.getElementById("confirmarSenha").value = ""

    mostrarMensagem("Perfil atualizado com sucesso!")
  }
  catch (error) {

    console.error(error)
    mostrarMensagem("Erro ao salvar perfil", "red")
  }
})

carregarPerfil()
