const Product = require("../models/Product");

/**
 * @desc    Add Product
 * @route   POST api/products
 * @access  Private
 */
exports.addProduct = async (req, res, next) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json({
    succces: true,
    message: "Product Created",
    data: product,
  });
};

/**
 * @desc    GET Products
 * @route   GET api/products
 * @access  Public
 */
exports.getProducts = async (req, res, next) => {
  Product.getProducts((products) => {
    res.status(200).json({
      succces: true,
      message: "All Products Fetched",
      data: products,
    });
  });
};

/**
 * @desc    GET Product By ID
 * @route   GET api/products/:id
 * @access  Public
 */
exports.getProduct = async (req, res, next) => {
  await Product.getProduct(req.params.id, (product) => {
    res.status(200).json({
      succces: true,
      message: "Product Fetched",
      data: product,
    });
  });
};

/**
 * @desc    Update Product
 * @route   PUT api/products/:id
 * @access  Private
 */
exports.updateProduct = async (req, res, next) => {
  req.body.id = req.params.id;
  const product = new Product(req.body);
  await product.save((product) => {
    res.status(200).json({
      succces: true,
      message: "Product Updated",
      data: product,
    });
  });
};

/**
 * @desc    Delete Product By ID
 * @route   DELETE api/products/:id
 * @access  Private
 */
exports.deleteProduct = async (req, res, next) => {
  await Product.deleteProduct(req.params.id, (prod) => {
    res.status(200).json({
      succces: true,
      message: "Product Deleted",
      data: prod,
    });
  });
};
