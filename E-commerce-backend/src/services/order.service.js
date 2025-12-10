const Order = require('../models/order.model');
const Address = require('../models/address.model');

const createOrder = async (orderData) => {
    try {
        const order = new Order(orderData);
        const savedOrder = await order.save();
        return savedOrder;
    } catch (error) {
        throw new Error("Error creating order");
    }
};

const getUserOrders = async (userId) => {
    try {
        const orders = await Order.find({ user: userId })
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'product',
                    select: 'name images price discountedPrice'
                }
            })
            .populate('shippingAddress')
            .sort({ createdAt: -1 });
        return orders;
    } catch (error) {
        throw new Error("Error fetching user orders");
    }
};

const getOrderById = async (orderId, userId) => {
    try {
        const order = await Order.findOne({ _id: orderId, user: userId })
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'product',
                    select: 'name images price discountedPrice description'
                }
            })
            .populate('shippingAddress');
        
        if (!order) {
            throw new Error("Order not found");
        }
        
        return order;
    } catch (error) {
        throw new Error("Error fetching order");
    }
};

const updateOrderStatus = async (orderId, userId, status) => {
    try {
        const order = await Order.findOneAndUpdate(
            { _id: orderId, user: userId },
            { status },
            { new: true }
        );
        
        if (!order) {
            throw new Error("Order not found");
        }
        
        return order;
    } catch (error) {
        throw new Error("Error updating order status");
    }
};

const getUserAddresses = async (userId) => {
    try {
        const addresses = await Address.find({ user: userId });
        return addresses;
    } catch (error) {
        throw new Error("Error fetching user addresses");
    }
};

const createAddress = async (addressData) => {
    try {
        const address = new Address(addressData);
        const savedAddress = await address.save();
        return savedAddress;
    } catch (error) {
        throw new Error("Error creating address");
    }
};

const updateAddress = async (addressId, userId, updateData) => {
    try {
        const address = await Address.findOneAndUpdate(
            { _id: addressId, user: userId },
            updateData,
            { new: true }
        );
        
        if (!address) {
            throw new Error("Address not found");
        }
        
        return address;
    } catch (error) {
        throw new Error("Error updating address");
    }
};

const deleteAddress = async (addressId, userId) => {
    try {
        const address = await Address.findOneAndDelete({ _id: addressId, user: userId });
        
        if (!address) {
            throw new Error("Address not found");
        }
        
        return address;
    } catch (error) {
        throw new Error("Error deleting address");
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
