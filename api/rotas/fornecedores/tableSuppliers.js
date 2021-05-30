const model = require("./tableModelSupplier");
module.exports = {
  findAll() {
    return model.findAll();
  },
  insert(supplier) {
    return model.create(supplier);
  },
  async findById(id) {
    const foundSupplier = await model.findOne({
      where: { id },
    });
    if (!foundSupplier) {
      throw new Error("Supplier not found");
    } else {
      return foundSupplier;
    }
  },
  update(id, dataToUpdate) {
    return model.update(dataToUpdate, {
      where: { id },
    });
  },
  remove(id) {
    return model.destroy({
      where: { id },
    });
  },
};
