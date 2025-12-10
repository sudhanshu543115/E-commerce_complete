const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

// Single CORS setup with options for your frontend domain
app.use(cors({
  origin: ['https://e-commerce-frontend-pi-ochre.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.get("/", (req, res) => {
  return res.status(200).send({ message: "Welcome to the E-commerce API" });
});

const authRouters = require("./routes/auth.route");
app.use("/auth", authRouters);

const userRouters = require("./routes/user.route");
app.use("/api/users", userRouters);

const orderRouters = require("./routes/order.route");
app.use("/api/orders", orderRouters);

const productRouters = require("./routes/product.route");
app.use("/api/products", productRouters);

// Add men's kurta specific route
app.use("/api/men", productRouters);

module.exports = app;
