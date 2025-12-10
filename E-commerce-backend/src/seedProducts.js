const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const connectDb = require("./config/db.js");

const sampleProducts = [
    {
        title: "Women's Blue Jeans",
        description: "Comfortable and stylish blue jeans for women",
        price: 2999,
        discountedPrice: 2399,
        discountPercent: 20,
        quantity: 50,
        brand: "Levi's",
        color: "Blue",
        sizes: { name: "M", quantity: 10 },
        imageUrl: "https://example.com/blue-jeans.jpg",
        rating: { value: 4.5, count: 120 },
        numRatings: 120,
        category: new mongoose.Types.ObjectId()
    },
    {
        title: "Women's Black Jeans",
        description: "Classic black jeans perfect for any occasion",
        price: 3299,
        discountedPrice: 2799,
        discountPercent: 15,
        quantity: 30,
        brand: "Zara",
        color: "Black",
        sizes: { name: "L", quantity: 8 },
        imageUrl: "https://example.com/black-jeans.jpg",
        rating: { value: 4.2, count: 85 },
        numRatings: 85,
        category: new mongoose.Types.ObjectId()
    },
    {
        title: "Women's Skinny Jeans",
        description: "Trendy skinny fit jeans for a modern look",
        price: 2799,
        discountedPrice: 2239,
        discountPercent: 20,
        quantity: 40,
        brand: "H&M",
        color: "Dark Blue",
        sizes: { name: "S", quantity: 15 },
        imageUrl: "https://example.com/skinny-jeans.jpg",
        rating: { value: 4.0, count: 95 },
        numRatings: 95,
        category: new mongoose.Types.ObjectId()
    },
    {
        title: "Women's High Waist Jeans",
        description: "High waisted jeans with a flattering fit",
        price: 3499,
        discountedPrice: 2799,
        discountPercent: 20,
        quantity: 25,
        brand: "Forever 21",
        color: "Light Blue",
        sizes: { name: "M", quantity: 12 },
        imageUrl: "https://example.com/high-waist-jeans.jpg",
        rating: { value: 4.3, count: 110 },
        numRatings: 110,
        category: new mongoose.Types.ObjectId()
    },
    {
        title: "Men's Cotton Kurta",
        description: "Traditional cotton kurta for men, perfect for festivals",
        price: 1999,
        discountedPrice: 1599,
        discountPercent: 20,
        quantity: 35,
        brand: "Fabindia",
        color: "White",
        sizes: { name: "L", quantity: 12 },
        imageUrl: "https://example.com/mens-white-kurta.jpg",
        rating: { value: 4.4, count: 75 },
        numRatings: 75,
        category: new mongoose.Types.ObjectId()
    },
    {
        title: "Men's Silk Kurta",
        description: "Elegant silk kurta for special occasions",
        price: 3999,
        discountedPrice: 3199,
        discountPercent: 20,
        quantity: 20,
        brand: "Manyavar",
        color: "Golden",
        sizes: { name: "M", quantity: 8 },
        imageUrl: "https://example.com/mens-silk-kurta.jpg",
        rating: { value: 4.6, count: 90 },
        numRatings: 90,
        category: new mongoose.Types.ObjectId()
    },
    {
        title: "Men's Printed Kurta",
        description: "Stylish printed kurta for casual wear",
        price: 1599,
        discountedPrice: 1279,
        discountPercent: 20,
        quantity: 45,
        brand: "W for Woman",
        color: "Blue",
        sizes: { name: "XL", quantity: 15 },
        imageUrl: "https://example.com/mens-printed-kurta.jpg",
        rating: { value: 4.1, count: 65 },
        numRatings: 65,
        category: new mongoose.Types.ObjectId()
    }
];

async function seedProducts() {
    try {
        await connectDb();
        console.log("Connected to database");
        
        // Clear existing products
        await Product.deleteMany({});
        console.log("Cleared existing products");
        
        // Insert sample products
        const insertedProducts = await Product.insertMany(sampleProducts);
        console.log(`Inserted ${insertedProducts.length} sample products`);
        
        console.log("Sample products added successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding products:", error);
        process.exit(1);
    }
}

seedProducts();
