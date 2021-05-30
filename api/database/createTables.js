const tableModel = require("../rotas/fornecedores/tableModelSupplier");

tableModel
  .sync()
  .then(() => console.log("tabela criada com sucesso"))
  .catch(console.log);
