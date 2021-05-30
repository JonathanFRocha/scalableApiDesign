class ValueNotSupported extends Error {
  constructor(contentType) {
    super(`The content type '${contentType}' is not supported`);
    this.name = "contentTypeNotSupported";
    this.idErro = 3;
  }
}

module.exports = ValueNotSupported;
