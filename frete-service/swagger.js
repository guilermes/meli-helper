const swaggerJsdoc = require("swagger-jsdoc")

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Frete Service",
      version: "1.0.0",
      description: "API de cálculo de frete"
    },
    servers: [
      {
        url: "http://localhost:4000"
      }
    ]
  },
  apis: ["./*.js"] // pega comentários do projeto inteiro
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = swaggerSpec