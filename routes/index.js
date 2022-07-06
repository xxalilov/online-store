const express = require("express");

const productRoute = require("./product");

const router = express();

router.use("/products", productRoute);

module.exports = router;
