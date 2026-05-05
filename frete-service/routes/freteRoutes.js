const express = require("express")
const router = express.Router()

const controller = require("../controllers/freteController")

router.post("/calcular", controller.calcularFrete)

module.exports = router