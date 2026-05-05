const swaggerJsdoc = require("swagger-jsdoc")

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Marketplace API",
      version: "1.0.0",
      description: "Documentação da API"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ],

    // CONFIGURAÇÃO JWT (CORRETA)
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },

    // APLICA JWT GLOBALMENTE (SEM TOKEN AQUI!)
    security: [
      {
        bearerAuth: []
      }
    ]
  },

  apis: ["./src/routes/*.js"]
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = swaggerSpec