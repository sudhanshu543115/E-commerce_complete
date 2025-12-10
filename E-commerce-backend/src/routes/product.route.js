const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller.js");

// GET /api/products - Get all products
router.get("/", productController.getAllProducts);

// GET /api/products/mens-kurta - Get men's kurta products
router.get("/mens_kurta", productController.getMensKurta);

// GET /api/products/:id - Get product by ID
router.get("/:id", productController.getProductById);

// POST /api/products - Create new product
router.post("/", productController.createProduct);

// PUT /api/products/:id - Update product
router.put("/:id", productController.updateProduct);

// DELETE /api/products/:id - Delete product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
