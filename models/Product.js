const fs = require("fs");
const path = require("path");
const uuid = require("uuid").v4;

// JSON File Path
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

// Read Datas From JSON file
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(product) {
    this.id = product.id;
    this.title = product.title;
    this.description = product.description;
    this.price = product.price;
    this.image = product.image;
  }

  // Create and Update Method
  save(cb) {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProduct = products.find((prod) => prod.id === this.id);
        if (!existingProduct) {
          return cb([]);
        }
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        this.title = this.title ? this.title : existingProduct.title;
        this.description = this.description
          ? this.description
          : existingProduct.description;
        this.price = this.price ? this.price : existingProduct.price;
        this.image = this.image ? this.image : existingProduct.image;
        updatedProducts[existingProductIndex] = this;
        cb(updatedProducts[existingProductIndex]);
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = uuid();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  // Get Product By ID
  static getProduct(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      cb(product);
    });
  }

  // Get All Products
  static getProducts(cb) {
    getProductsFromFile(cb);
  }

  // Delete Product By ID
  static deleteProduct(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      const updatedProducts = products.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        console.log(err);
      });
      cb([]);
    });
  }
};
