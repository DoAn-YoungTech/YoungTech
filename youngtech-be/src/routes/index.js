const express = require("express");
const userRoutes = require("./userRoutes");

// routes/userRoutes.js
const router = express.Router();

router.use("/users", userRoutes);
// router.use("/products", productRoutes);

module.exports = router;
