const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
//const MONGODB_URI="mongodb+srv://manudubey249:1uEB0BGipqhxSP9l@cluster0.fo632zz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//const MONGODB_URI = "mongodb+srv://manudubey249:1uEB0BGipqhxSP9l@cluster0.fo632zz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" ; 
//const MONGODB_URI = "mongodb+srv://manudubey249:228145@cluster0.cml2hse.mongodb.net/?appName=Cluster0"
const MONGODB_URI = process.env.MONGODB_URI;       
//console.log("MONGODB_URI:", MONGODB_URI);


const connectDb=()=> {
    return mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Database connected successfully");
    }).catch((error) => {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit the process with failure
    });
}

module.exports = connectDb;
