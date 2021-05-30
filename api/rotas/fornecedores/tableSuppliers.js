const model = require("./tableModelSupplier");
module.exports = {
  findAll() {
    return model.findAll();
  },
  insert(supplier) {
    return model.create(supplier);
  },
};
