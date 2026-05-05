const fetch = require("node-fetch")

async function getConfig() {
  const res = await fetch("http://localhost:4000/config")
  return res.json()
}

module.exports = { getConfig }