const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discountedPrice: {
        type: Number,
        required: true,
        min: 0
    },
    discountPercent: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    brand: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    sizes: {
        name: {type:String},
        quantity: {type:Number}
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    imageUrl: {
        type: String,
    },
    rating: {
        value: { type: Number, min: 0, max: 5 },
        count: { type: Number, min: 0 }
    },
    ratings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "ratings"
    }],
    numRatings: {
        type: Number,
        min: 0
    },



    
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Product = mongoose.model("Products", productSchema);
module.exports = Product;
