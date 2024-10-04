const express = require("express");
const supplierRoutes = require("./supplierRoutes");

const router = express.Router();

router.use("/suppliers", supplierRoutes);

module.exports = router;
