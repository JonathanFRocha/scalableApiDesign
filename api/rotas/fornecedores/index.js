const router = require("express").Router();
const tableSupplier = require("./tableSuppliers");
const Supplier = require("./supplier");
router.get("/", async (req, res) => {
  const results = await tableSupplier.findAll();
  res.status(200);
  res.send(JSON.stringify(results));
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const supplier = new Supplier(data);
    await supplier.create();
    res.status(201);
    res.send(JSON.stringify(supplier));
  } catch (error) {
    res.status(400);
    res.send(
      JSON.stringify({
        message: error.message,
      })
    );
  }
});

router.get("/:idSupplier", async (req, res) => {
  const id = req.params.idSupplier;
  const supplier = new Supplier({ id: id });
  try {
    await supplier.load();
    res.status(200);
    res.send(JSON.stringify(supplier));
  } catch (error) {
    res.status(404);
    res.send(
      JSON.stringify({
        mensage: error.message,
      })
    );
  }
});

router.put("/:idSupplier", async (req, res) => {
  try {
    const id = req.params.idSupplier;
    const data = req.body;
    const newData = Object.assign({}, data, { id: id });
    const supplier = new Supplier(newData);
    await supplier.update();
    res.status(204);
    res.end();
  } catch (error) {
    res.status(400);
    res.send(
      JSON.stringify({
        message: error.message,
      })
    );
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
