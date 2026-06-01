const express = require("express");
const cors = require("cors");
const freteRoutes = require("./routes/freteRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/", freteRoutes);

app.listen(4000, () => {
  console.log("🚚 Frete service rodando na porta 4000");
});