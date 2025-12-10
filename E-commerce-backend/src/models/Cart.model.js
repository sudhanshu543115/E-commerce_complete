const mongoose = require ("mongoose")

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    cartItems: [{
        
            type: mongoose.Schema.Types.ObjectId,
            ref: "cartItems",
            required: true
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    totalItems: {
        type: Number,
        required: true,
        min: 0
    },
    totalDDiscountPrice: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        required: true,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;