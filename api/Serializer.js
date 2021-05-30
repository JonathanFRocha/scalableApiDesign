const ValueNotSupported = require("./error/ValueNotSupported");

class Serializer {
  json(data) {
    return JSON.stringify(data);
  }

  serialize(data) {
    if (this.contentType === "application/json") {
      return this.json(this.filter(data));
    }

    throw new ValueNotSupported(this.contentType);
  }

  filterObject(data) {
    const newObject = {};

    this.publicFields.forEach((field) => {
      if (data.hasOwnProperty(field)) {
        newObject[field] = data[field];
      }
    });

    return newObject;
  }

  filter(data) {
    if (Array.isArray(data)) {
      data = data.map((supplier) => this.filterObject(supplier));
    } else {
      data = this.filterObject(data);
    }
    return data;
  }
}

class SerializerSuppliers extends Serializer {
  constructor(contentType, extraFields) {
    super();
    this.contentType = contentType;
    this.publicFields = ["id", "company", "category"].concat(extraFields || []);
  }
}

class SerializerErrors extends Serializer {
  constructor(contentType, extraFields) {
    super();
    this.contentType = contentType;
    this.publicFields = ["id", "message"].concat(extraFields || []);
  }
}

module.exports = {
  Serializer,
  SerializerSuppliers,
  SerializerErrors,
  acceptedFormats: ["application/json"],
};
