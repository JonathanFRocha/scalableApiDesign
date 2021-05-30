const router = require("express").Router();
const tableSupplier = require("./tableSuppliers");
const Supplier = require("./supplier");
const instance = require("../../database");
const NotFound = require("../../error/NotFound");
router.get("/", async (req, res) => {
  const results = await tableSupplier.findAll();
  res.status(200);
  res.send(JSON.stringify(results));
});

router.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const supplier = new Supplier(data);
    await supplier.create();
    res.status(201);
    res.send(JSON.stringify(supplier));
  } catch (error) {
    next(error);
  }
});

router.get("/:idSupplier", async (req, res, next) => {
  const id = req.params.idSupplier;
  const supplier = new Supplier({ id: id });
  try {
    await supplier.load();
    res.status(200);
    res.send(JSON.stringify(supplier));
  } catch (error) {
    next(error);
  }
});

router.put("/:idSupplier", async (req, res, next) => {
  try {
    const id = req.params.idSupplier;
    const data = req.body;
    const newData = Object.assign({}, data, { id: id });
    const supplier = new Supplier(newData);
    await supplier.update();
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
});

router.delete("/:idSupplier", async (req, res) => {
  try {
    const id = req.params.idSupplier;
    const supplier = new Supplier({ id });
    await supplier.load();
    await supplier.remove();
    res.status(204);
    res.end();
  } catch (error) {
    res.status(404);
    res.send(
      JSON.stringify({
        message: error.message,
      })
    );
  }
});

module.exports = router;
