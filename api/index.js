const express = require("express");
const config = require("config");
const router = require("./rotas/fornecedores");
const NotFound = require("./error/NotFound");
const InvalidField = require("./error/invalidField");
const AnyDataProvided = require("./error/AnyDataProvided");
const ValueNotSupported = require("./error/ValueNotSupported");
const { acceptedFormats, Serializer } = require("./Serializer");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  let formatRequested = req.header("Accept");

  if (formatRequested === "*/*") {
    formatRequested = "application/json";
  }

  if (!acceptedFormats.includes(formatRequested)) {
    res.status(406);
    res.end();
    return;
  }

  res.setHeader("Content-Type", formatRequested);
  next();
});

app.use("/api/fornecedores", router);

app.use((error, req, res, next) => {
  let status = 500;
  if (error instanceof NotFound) {
    status = 404;
  }
  if (error instanceof InvalidField || AnyDataProvided) {
    status = 400;
  }
  if (error instanceof ValueNotSupported) {
    status = 406;
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
