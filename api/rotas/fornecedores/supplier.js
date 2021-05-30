const supplierTable = require("./tableSuppliers");
class Supplier {
  constructor({ id, company, email, category, createdAt, updatedAt, version }) {
    this.id = id;
    this.company = company;
    this.email = email;
    this.category = category;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.version = version;
  }

  async create() {
    this.validar();
    const results = await supplierTable.insert({
      company: this.company,
      email: this.email,
      category: this.category,
    });

    this.id = results.id;
    this.createdAt = results.createdAt;
    this.updatedAt = results.updatedAt;
    this.version = results.version;
  }

  async load() {
    const foundSupplier = await supplierTable.findById(this.id);
    const { company, email, category, createdAt, updatedAt, version } =
      foundSupplier;
    this.company = company;
    this.email = email;
    this.category = category;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.version = version;
  }

  async update() {
    await supplierTable.findById(this.id);
    const fields = ["company", "email", "category"];
    const dataToUpdate = {};

    fields.forEach((field) => {
      const value = this[field];
      if (typeof value === "string" && value.length > 0) {
        dataToUpdate[field] = value;
      }
    });

    if (Object.keys(dataToUpdate).length === 0) {
      throw new Error("any data was provided to be updated");
    }

    await supplierTable.update(this.id, dataToUpdate);
  }

  async remove() {
    return await supplierTable.remove(this.id);
  }

  validar() {
    const fields = ["company", "email", "category"];
    fields.forEach((field) => {
      const value = this[field];
      if (typeof value !== "string" || value.length === 0) {
        throw new Error(`the input ${field} is invalid`);
      }
    });
  }
}

module.exports = Supplier;
