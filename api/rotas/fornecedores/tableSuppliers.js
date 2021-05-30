const model = require("./tableModelSupplier");
module.exports = {
  findAll() {
    return model.findAll();
  },
};
