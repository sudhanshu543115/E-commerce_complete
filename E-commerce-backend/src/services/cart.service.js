const Cart = require('../models/Cart.model.js');
const CartItems = require('../models/catItem.model.js');

async function createCart(user) {
    try {
        const cart = new Cart({ user });
        const createdCart = await cart.save();
        return createdCart;
    } catch (error) {
        throw new Error("Error creating cart");
    }
   
    
   
}

async function findUserCart(userId) {
    try {
        let  cart = await Cart.findOne({ user: userId });

        

        let cartItems = await CartItems.find({ cart: cart._id }).populate('product');
        cart.cartItems = cartItems;

        let totalPrice = 0;
        let totalDiscountedPrice=0;

        for(let cartItem of cartItems) {
            totalPrice += cartItem.price;
            totalDiscountedPrice += cartItem.discountedPrice;
        }

        cart.totalPrice = totalPrice;
        cart.totalDiscountedPrice = totalDiscountedPrice;

        return cart;
    } catch (error) {
        throw new Error("Error finding user cart");
    }
}

module.exports = { createCart, findUserCart };
