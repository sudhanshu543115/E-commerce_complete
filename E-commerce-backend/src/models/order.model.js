const mongoose = require("mongoose");

const  {Schema} = mongoose;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users"
        
    },
    orderItems: [{
        type: Schema.Types.ObjectId,
        ref: "orderItem",
        required: true
    }],
    orderDate: {
        type: Date,
        default: Date.now(),
        required: true
    },
    deliveryDate:{
        type: Date
        
    },
    shippingAddress: {
        type: Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
    paymentDetails: {
        paymentMethod: {
            type: String
            
            
        },
        paymentStatus: {
            type: String
           
        },
        transactionId: {
            type: String
            
        },
        paymentId: {
            type: String
        },

    },



    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },





    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered", "cancelled"],
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model("Orders", orderSchema);
module.exports = Order;
