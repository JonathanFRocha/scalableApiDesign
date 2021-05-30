const express = require("express");
const config = require("config");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(config.get("api.port"), () => {
  console.log("api listening on port " + config.get("api.port"));
});
