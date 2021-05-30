const ValueNotSupported = require("./error/ValueNotSupported");
const jsontoxml = require("jsontoxml");
class Serializer {
  json(data) {
    return JSON.stringify(data);
  }

  xml(data) {
    let tag = this.tagSingleSupplier;
    if (Array.isArray(data)) {
      tag = this.tagMoreThanOneSupplier;
      data = data.map((item) => {
        return {
          [this.tagSingleSupplier]: item,
        };
      });
    }
    return jsontoxml({ [tag]: data });
  }

  serialize(data) {
    data = this.filter(data);
    if (this.contentType === "application/json") {
      return this.json(data);
    }
    if (this.contentType === "application/xml") {
      return this.xml(data);
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
    this.tagSingleSupplier = "supplier";
    this.tagMoreThanOneSupplier = "suppliers";
  }
}

class SerializerErrors extends Serializer {
  constructor(contentType, extraFields) {
    super();
    this.contentType = contentType;
    this.publicFields = ["id", "message"].concat(extraFields || []);
    this.tagSingleSupplier = "error";
    this.tagMoreThanOneSupplier = "errors";
  }
}

module.exports = {
  Serializer,
  SerializerSuppliers,
  SerializerErrors,
  acceptedFormats: ["application/json", "application/xml"],
};
