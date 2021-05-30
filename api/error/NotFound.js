class NotFound extends Error {
  constructor() {
    super("Supplier not found!");
    this.name = "NotFound";
    this.idErro = 0;
  }
}

module.exports = NotFound;
