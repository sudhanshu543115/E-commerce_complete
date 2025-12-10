const mongoose = require("mongoose");   

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Categories"
    },
    level: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
