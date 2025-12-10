const Product = require("../models/product.model.js");

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ 
            message: "Error fetching products", 
            error: error.message 
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        let product;
        
        // Try to find by MongoDB ObjectId first
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            product = await Product.findById(id).populate('category');
        } else {
            // If not ObjectId format, search by numeric id field
            product = await Product.findOne({ id: parseInt(id) }).populate('category');
        }
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ 
            message: "Error fetching product", 
            error: error.message 
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ 
            message: "Error creating product", 
            error: error.message 
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        ).populate('category');
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ 
            message: "Error updating product", 
            error: error.message 
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ 
            message: "Error deleting product", 
            error: error.message 
        });
    }
};

const getMensKurta = async (req, res) => {
    try {
        const products = await Product.find({
            $or: [
                { category: { $regex: /kurta/i } },
                { title: { $regex: /kurta/i } },
                { topLevelCategory: { $regex: /men/i } }
            ]
        }).populate('category');
        
        res.status(200).json({ mens_kurta: products });
    } catch (error) {
        console.error('Error fetching men\'s kurta products:', error);
        res.status(500).json({ 
            message: "Error fetching men's kurta products", 
            error: error.message 
        });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getMensKurta
};
