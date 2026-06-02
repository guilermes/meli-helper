const fetch = require("node-fetch")

async function getConfig() {
  const res = await fetch(process.env.CONFIG_SERVICE_URL + "/config")
  return res.json()
}

module.exports = { getConfig }