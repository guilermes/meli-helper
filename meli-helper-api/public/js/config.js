// 🔒 VERIFICA LOGIN
if (!localStorage.getItem("token")) {
  window.location.href = "index.html"
}

////////////////////////////////////////////////////////////

// 🔑 HEADERS
function getHeaders() {

  return {
    "Content-Type": "application/json",

    Authorization:
      "Bearer " +
      localStorage.getItem("token")
  }
}

////////////////////////////////////////////////////////////

// 🔹 LOGOUT
function logout() {

  localStorage.removeItem("token")

  window.location.href = "index.html"
}

////////////////////////////////////////////////////////////

// 🔹 MENSAGEM
let timeoutId

function mostrarMensagem(
  texto,
  cor = "green"
) {

  const msg =
    document.getElementById("msg")

  if (!msg) return

  msg.textContent = texto
  msg.style.color = cor

  clearTimeout(timeoutId)

  timeoutId = setTimeout(() => {
    msg.textContent = ""
  }, 2500)
}

////////////////////////////////////////////////////////////

// 🔹 CARREGAR CONFIG
async function carregarConfiguracao() {

  try {

    const res =
      await fetch(
        "http://localhost:3000/config",
        {
          headers: getHeaders()
        }
      )

    if (res.status === 401) {
      logout()
      return
    }

    const data = await res.json()

    ////////////////////////////////////////////////////////
    // INPUTS

    document.getElementById("imposto").value =
      data.imposto ?? 0

    document.getElementById("custoOperacional").value =
      data.custoOperacional ?? 0

    ////////////////////////////////////////////////////////
    // RESUMO

    document.getElementById("confImposto").textContent =
      data.imposto ?? 0

    document.getElementById("confCusto").textContent =
      Number(
        data.custoOperacional ?? 0
      ).toFixed(2)

  }
  catch (error) {

    console.error(error)

    mostrarMensagem(
      "Erro ao carregar configuração",
      "red"
    )
  }
}

////////////////////////////////////////////////////////////

// 🔹 FORM
const form =
  document.getElementById("formConfig")

if (form) {

  form.addEventListener(
    "submit",

    async (e) => {

      e.preventDefault()

      try {

        ////////////////////////////////////////////////////
        // BODY

        const data = {

          imposto: Number(
            document
              .getElementById("imposto")
              .value
          ) || 0,

          custoOperacional: Number(
            document
              .getElementById("custoOperacional")
              .value
          ) || 0
        }

        ////////////////////////////////////////////////////
        // REQUEST

        const res =
          await fetch(
            "http://localhost:3000/config",
            {
              method: "POST",

              headers: getHeaders(),

              body: JSON.stringify(data)
            }
          )

        if (res.status === 401) {
          logout()
          return
        }

        if (!res.ok) {
          throw new Error()
        }

        ////////////////////////////////////////////////////
        // SUCESSO

        mostrarMensagem(
          "Configuração salva com sucesso!"
        )

        carregarConfiguracao()

      }
      catch (error) {

        console.error(error)

        mostrarMensagem(
          "Erro ao salvar configuração",
          "red"
        )
      }
    }
  )
}

////////////////////////////////////////////////////////////

// 🔥 INIT
carregarConfiguracao()