const orderService = require('../services/order.service');

const createOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const orderData = { ...req.body, user: userId };
        
        const order = await orderService.createOrder(orderData);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await orderService.getUserOrders(userId);
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.userId;
        
        const order = await orderService.getOrderById(orderId, userId);
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const userId = req.userId;
        
        const order = await orderService.updateOrderStatus(orderId, userId, status);
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUserAddresses = async (req, res) => {
    try {
        const userId = req.userId;
        const addresses = await orderService.getUserAddresses(userId);
        res.status(200).json(addresses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const addressData = { ...req.body, user: userId };
        
        const address = await orderService.createAddress(addressData);
        res.status(201).json(address);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateAddress = async (req, res) => {
    try {
        const { addressId } = req.params;
        const userId = req.userId;
        const updateData = req.body;
        
        const address = await orderService.updateAddress(addressId, userId, updateData);
        res.status(200).json(address);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteAddress = async (req, res) => {
    try {
        const { addressId } = req.params;
        const userId = req.userId;
        
        const address = await orderService.deleteAddress(addressId, userId);
        res.status(200).json({ message: "Address deleted successfully", address });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus,
    getUserAddresses,
    createAddress,
    updateAddress,
    deleteAddress
};


