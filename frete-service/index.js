const express = require("express");
const cors = require("cors");
const freteRoutes = require("./routes/freteRoutes");

const app = express();

const allowedOrigins = ["https://meli-helper-gfsgpkwqm-guilermes-projects.vercel.app"];

if (process.env.NODE_ENV !== "production") {
  allowedOrigins.push(/^http:\/\/localhost:\d+$/, /^http:\/\/127\.0\.0\.1:\d+$/);
}

app.use(cors({
  origin: allowedOrigins,
}));

app.use(express.json());

app.use("/", freteRoutes);

app.listen(4000, () => {
  console.log("🚚 Frete service rodando na porta 4000");
});