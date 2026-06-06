const express = require("express");
const cors = require("cors");
const freteRoutes = require("./routes/freteRoutes");

const app = express();

app.use(cors({
  origin: "https://meli-helper-gfsgpkwqm-guilermes-projects.vercel.app/",

}));

app.use(express.json());

app.use("/", freteRoutes);

app.listen(4000, () => {
  console.log("🚚 Frete service rodando na porta 4000");
});