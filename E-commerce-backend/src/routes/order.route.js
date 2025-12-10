const express = require("express");
const router = express.Router();
const orderController = require("../controller/order.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

// All order routes require authentication
router.use(authenticateToken);

// Order routes
router.post("/", orderController.createOrder);
router.get("/", orderController.getUserOrders);
router.get("/:orderId", orderController.getOrderById);
router.put("/:orderId/status", orderController.updateOrderStatus);

// Address routes
router.get("/addresses", orderController.getUserAddresses);
router.post("/addresses", orderController.createAddress);
router.put("/addresses/:addressId", orderController.updateAddress);
router.delete("/addresses/:addressId", orderController.deleteAddress);

module.exports = router;


