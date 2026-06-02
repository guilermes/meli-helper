const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()

// Middlewares Globais de Infraestrutura
app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONTEND_URL, // URL do frontend
  credentials: true
}));
app.use(express.json())
app.use(express.static("public"))

// Importação das Rotas
const authRoutes = require("./routes/authRoutes") // 🌟 Movido para cima
const anuncioRoutes = require("./routes/anuncioRoutes")
const configRoutes = require("./routes/configRoutes")
const userRoutes = require("./routes/userRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes") // Rota de dashboard, que é uma rota de análise, deve vir depois das rotas de anúncios e configuração
const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./config/swagger")

// ==========================================================================
// 🛣️ DECLARAÇÃO DE ROTAS (A ordem aqui de cima para baixo é crucial)
// ==========================================================================

// 1. Rotas totalmente públicas (Login e Registro) precisam vir PRIMEIRO
app.use(authRoutes) 

// 2. Rotas específicas e protegidas por seus respectivos prefixos
app.use("/users", userRoutes)
app.use("/anuncios", anuncioRoutes)
app.use("/config", configRoutes)
app.use('/dashboard', dashboardRoutes);


// 3. Documentação da API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Inicialização do Servidor
app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor rodando em http://localhost:${process.env.PORT || 3000}`)
})