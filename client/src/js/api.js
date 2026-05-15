const API_URL = "http://localhost:3000/anuncios"

async function getAnuncios() {
  const res = await fetch(API_URL)
  return res.json()
}

async function criarAnuncio(anuncio) {
  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(anuncio)
  })
}