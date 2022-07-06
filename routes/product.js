const express = require("express");

const { addProduct, getProducts } = require("../controllers/product");

const router = express.Router();

router.post("/", addProduct);

router.get("/", getProducts);

module.exports = router;
