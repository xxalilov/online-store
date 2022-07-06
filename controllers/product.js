const Product = require("../models/Product");

exports.addProduct = async (req, res, next) => {
  const { title, description, price, image } = req.body;

  const product = new Product(req.body);
  product.save();
  res.status(201).json({
    succces: true,
    message: "Product Created",
    data: product,
  });
};

exports.getProducts = async (req, res, next) => {
  const products = Product.getProducts();
  console.log(products);

  res.status(200).json({
    succces: true,
    message: "All Products Fetched",
    data: products,
  });
};
