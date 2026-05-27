const form =
  document.getElementById("formRegister")

const msg =
  document.getElementById("msg")

///////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////

form.addEventListener("submit", async (e) => {

  e.preventDefault()

  const senha =
    document.getElementById("senha").value

  const confirmarSenha =
    document.getElementById("confirmarSenha").value

  if (senha !== confirmarSenha) {

    msg.className =
      "text-danger text-center mt-3 fw-semibold"

    msg.innerText =
      "As senhas não coincidem"

    return
  }

  /////////////////////////////////////////////////////////

  const body = {

    nome:
      document.getElementById("nome").value,

    nomeLoja:
      document.getElementById("nomeLoja").value,

    email:
      document.getElementById("email").value,

    senha,

    confirmarSenha,

    nicho:
      document.getElementById("nicho").value,

    nivelSeller:
      document.getElementById("nivelSeller").value
  }

  /////////////////////////////////////////////////////////

  try {

    const res = await fetch(
      "http://localhost:3000/register",
      {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(body)
      }
    )

    const data = await res.json()

    ///////////////////////////////////////////////////////

    if (!res.ok) {

      msg.className =
        "text-danger text-center mt-3 fw-semibold"

      msg.innerText = data.erro

      return
    }

    ///////////////////////////////////////////////////////

    msg.className =
      "text-success text-center mt-3 fw-semibold"

    msg.innerText =
      "Conta criada com sucesso!"

    ///////////////////////////////////////////////////////

    setTimeout(() => {

      window.location.href = "index.html"

    }, 1500)
  }

  catch (error) {

    console.error(error)

    msg.className =
      "text-danger text-center mt-3 fw-semibold"

    msg.innerText =
      "Erro ao conectar com API"
  }
})
