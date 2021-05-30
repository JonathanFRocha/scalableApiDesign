const express = require("express");
const config = require("config");
const router = require("./rotas/fornecedores");
const NotFound = require("./error/NotFound");
const InvalidField = require("./error/invalidField");
const AnyDataProvided = require("./error/AnyDataProvided");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/fornecedores", router);

app.use((error, req, res, next) => {
  let status = 500;
  if (error instanceof NotFound) {
    status = 404;
  }
  if (error instanceof InvalidField || AnyDataProvided) {
    status = 400;
  }
  res.status(status);
  res.send(
    JSON.stringify({
      message: error.message,
      id: error.idErro,
    })
  );
});

app.listen(config.get("api.port"), () => {
  console.log("api listening on port " + config.get("api.port"));
});
