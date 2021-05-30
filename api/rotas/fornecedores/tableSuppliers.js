const model = require("./tableModelSupplier");
const NotFound = require("../../error/NotFound");
module.exports = {
  findAll() {
    return model.findAll({ raw: true });
  },
  insert(supplier) {
    return model.create(supplier);
  },
  async findById(id) {
    const foundSupplier = await model.findOne({
      where: { id },
    });
    if (!foundSupplier) {
      throw new NotFound();
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
