const form =
  document.getElementById("formRegister")

const msg =
  document.getElementById("msg")

///////////////////////////////////////////////////////////

form.addEventListener("submit", async (e) => {

  e.preventDefault()

  /////////////////////////////////////////////////////////

  const body = {

    nome:
      document.getElementById("nome").value,

    nomeLoja:
      document.getElementById("nomeLoja").value,

    email:
      document.getElementById("email").value,

    senha:
      document.getElementById("senha").value,

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