const router = require("express").Router();
const tableSupplier = require("./tableSuppliers");
router.get("/", async (req, res) => {
  const results = await tableSupplier.findAll();
  res.send(JSON.stringify(results));
});

router.post("/", (req, res) => {
  const data = req.body;
});

module.exports = router;
