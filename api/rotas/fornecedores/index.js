const router = require("express").Router();
const tableSupplier = require("./tableSuppliers");
const Supplier = require("./supplier");
router.get("/", async (req, res) => {
  const results = await tableSupplier.findAll();
  res.send(JSON.stringify(results));
});

router.post("/", async (req, res) => {
  const data = req.body;
  const supplier = new Supplier(data);
  await supplier.create();
  res.send(JSON.stringify(supplier));
});

router.get("/:idSupplier", (req, res) => {
  const id = req.params.idSupplier;
  const supplier = new Supplier({ id: id });
});

module.exports = router;
