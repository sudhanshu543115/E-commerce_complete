const mongoose = require ("mongoose")

const cartItemSchema = new mongoose.Schema({

    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true
    },
    size: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }, 
    discountedPrice: {
        type: Number,
        required: true
        
    },
    userId:{
        type :mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }

})

const CartItem = mongoose.model("CartItem", cartItemSchema);
module.exports = CartItem;
