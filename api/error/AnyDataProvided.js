class AnyDataProvided extends Error {
  constructor() {
    super("any data was provided to be updated");
    this.name = "AnyDataProvided";
    this.idErro = 2;
  }
}

module.exports = AnyDataProvided;
