const express = require("express");
const config = require("config");
const router = require("./rotas/fornecedores");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/fornecedores", router);

app.listen(config.get("api.port"), () => {
  console.log("api listening on port " + config.get("api.port"));
});
