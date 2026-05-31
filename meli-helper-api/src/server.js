const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()

app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173' // URL do frontend
}));

app.use(express.json())

app.use(express.static("public"))

const anuncioRoutes = require("./routes/anuncioRoutes")
const configRoutes = require("./routes/configRoutes")
const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")
const swaggerUi = require("swagger-ui-express")

const swaggerSpec = require("./config/swagger")

app.use("/anuncios", anuncioRoutes)
app.use("/config", configRoutes)
app.use("/users", userRoutes)

app.use(userRoutes)
app.use(authRoutes)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))


app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000")
})