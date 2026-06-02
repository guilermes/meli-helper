const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()
require('dotenv').config();


// Middlewares Globais de Infraestrutura
app.use(cookieParser())
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'https://meli-helper-61dlfw9bu-guilermes-projects.vercel.app/'
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite requests sem origin
      if (!origin) return callback(null, true);

      // Permite localhost
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Permite previews da Vercel
      if (origin.includes('.vercel.app')) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS bloqueado para: ${origin}`)
      );
    },

    credentials: true,

    methods: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'OPTIONS',
    ],

    allowedHeaders: [
      'Content-Type',
      'Authorization',
    ],
  })
);
app.options(/.*/, cors());
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