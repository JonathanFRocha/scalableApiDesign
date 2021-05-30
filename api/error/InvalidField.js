class InvalidField extends Error {
  constructor(field) {
    const mensagem = `The field ${field} is invalid`;
    super(mensagem);
    this.name = "InvalidField";
    this.idErro = 1;
  }
}

module.exports = InvalidField;
