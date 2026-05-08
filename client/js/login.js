  const form = document.getElementById("formLogin")

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value

    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, senha })
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.erro)
      return
    }

    // 🔐 salva token
    localStorage.setItem("token", data.token)

    window.location.href = "lista.html"
  })