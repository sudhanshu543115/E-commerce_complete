# E-Commerce Application - Complete Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Backend Documentation](#backend-documentation)
6. [Frontend Documentation](#frontend-documentation)
7. [Database Models](#database-models)
8. [API Endpoints](#api-endpoints)
9. [Installation & Setup](#installation--setup)
10. [Configuration](#configuration)
11. [Features](#features)
12. [Recent Issues & Fixes](#recent-issues--fixes)

## Project Overview

This is a full-stack e-commerce application built with React.js frontend and Node.js/Express backend. The application provides a complete online shopping experience with user authentication, product browsing, cart management, and order processing.

**Project Name:** E-Commerce Application  
**Version:** 1.0.0  
**Author:** Development Team  
**License:** ISC  

## Architecture

The application follows a **MERN Stack** architecture:
- **Frontend:** React.js with Vite
- **Backend:** Node.js with Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Payment:** Razorpay Integration

```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐
│   React Frontend│ ◄─────────────────► │ Express Backend │
│   (Port: 5173)  │                     │   (Port: 9000)  │
└─────────────────┘                     └─────────────────┘
                                                │
                                                ▼
                                        ┌─────────────────┐
                                        │  MongoDB Atlas  │
                                        │    Database     │
                                        └─────────────────┘
```

## Technology Stack

### Backend Dependencies
- **express:** ^5.1.0 - Web framework
- **mongoose:** ^8.17.2 - MongoDB ODM
- **bcrypt:** ^6.0.0 - Password hashing
- **jsonwebtoken:** ^9.0.2 - JWT authentication
- **cors:** ^2.8.5 - Cross-origin resource sharing
- **dotenv:** ^17.2.1 - Environment variables
- **razorpay:** ^2.9.6 - Payment gateway
- **nodemon:** ^3.1.10 - Development server

### Frontend Dependencies
- **react:** ^19.1.0 - UI library
- **react-dom:** ^19.1.0 - DOM rendering
- **react-router-dom:** ^7.8.0 - Client-side routing
- **@mui/material:** ^7.3.1 - Material-UI components
- **@mui/icons-material:** ^7.3.1 - Material-UI icons
- **@headlessui/react:** ^2.2.7 - Unstyled UI components
- **@heroicons/react:** ^2.2.0 - Icon library
- **tailwindcss:** ^4.1.11 - CSS framework
- **react-alice-carousel:** ^2.9.1 - Carousel component
- **vite:** ^7.0.4 - Build tool

## Project Structure

```
E-commercee/
├── frontend/                    # React frontend application
│   ├── public/                  # Static assets
│   │   ├── 7_LEHENGA_CHOLI_1920x.webp
│   │   ├── dreesess_coll_1920x.webp
│   │   └── fashion-sale-design-template.jpg
│   ├── src/
│   │   ├── Customer/            # Customer-facing components
│   │   │   ├── Pages/           # Page components
│   │   │   │   └── HomePage/    # Homepage components
│   │   │   └── componants/      # Reusable components
│   │   │       ├── AdressCard/
│   │   │       ├── Auth/        # Authentication components
│   │   │       ├── Cart/        # Shopping cart
│   │   │       ├── CheckOut/    # Checkout process
│   │   │       ├── Footer/
│   │   │       ├── HomeCarousel/
│   │   │       ├── Navigation/
│   │   │       ├── Order/       # Order management
│   │   │       ├── Product/     # Product components
│   │   │       ├── ProductDetails/
│   │   │       └── Profile/     # User profile
│   │   ├── Routers/            # Route definitions
│   │   ├── context/            # React context
│   │   ├── services/           # API services
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   ├── package.json
│   └── vite.config.js
├── src/                        # Backend application
│   ├── config/                 # Configuration files
│   │   ├── db.js              # Database connection
│   │   └── jwtProvider.js     # JWT configuration
│   ├── controller/            # Route controllers
│   │   ├── auth.controller.js
│   │   ├── order.controller.js
│   │   ├── product.controller.js
│   │   └── user.controller.js
│   ├── middleware/            # Custom middleware
│   │   └── auth.middleware.js
│   ├── models/               # Mongoose models
│   │   ├── Cart.model.js
│   │   ├── address.model.js
│   │   ├── category.model.js
│   │   ├── order.model.js
│   │   ├── product.model.js
│   │   ├── rating.model.js
│   │   ├── review.js
│   │   └── user.model.js
│   ├── routes/               # API routes
│   │   ├── auth.route.js
│   │   ├── order.route.js
│   │   ├── product.route.js
│   │   └── user.route.js
│   ├── services/            # Business logic
│   ├── index.js            # Express app setup
│   ├── server.js           # Server startup
│   └── seedProducts.js     # Database seeding
├── package.json
└── README.md
```

## Backend Documentation

### Server Configuration
- **Port:** 9000 (configurable via PORT environment variable)
- **Database:** MongoDB Atlas
- **CORS:** Enabled for cross-origin requests

### Controllers

#### Product Controller (`product.controller.js`)
- `getAllProducts()` - Fetch all products with category population
- `getProductById()` - Fetch single product by ID
- `createProduct()` - Create new product
- `updateProduct()` - Update existing product
- `deleteProduct()` - Delete product

#### Auth Controller (`auth.controller.js`)
- User registration and login
- JWT token generation
- Password hashing with bcrypt

#### Order Controller (`order.controller.js`)
- Order creation and management
- Order history retrieval
- Order status updates

#### User Controller (`user.controller.js`)
- User profile management
- User data retrieval and updates

### Middleware
- **auth.middleware.js** - JWT token verification for protected routes

## Frontend Documentation

### Main Components

#### App.jsx
- Root component with routing setup
- AuthProvider context wrapper
- Route configuration for customer pages

#### Homepage (`Homepage.jsx`)
- Product fetching from backend API
- Loading and error state management
- Product filtering by category
- Integration with carousel components

### Customer Components

#### Authentication (`Auth/`)
- Login and registration forms
- JWT token management
- Protected route handling

#### Product Components (`Product/`)
- Product listing and display
- Product filtering and search
- Product detail views

#### Shopping Cart (`Cart/`)
- Add/remove items from cart
- Quantity management
- Cart total calculations

#### Checkout (`CheckOut/`)
- Order placement process
- Address management
- Payment integration

#### Navigation (`Navigation/`)
- Main navigation menu
- User authentication status
- Cart item count display

## Database Models

### Product Model
```javascript
{
  title: String (required),
  description: String (required),
  price: Number (required, min: 0),
  discountedPrice: Number (required, min: 0),
  discountPercent: Number (required, min: 0),
  quantity: Number (required, min: 0),
  brand: String (required),
  color: String (required),
  sizes: { name: String, quantity: Number },
  category: ObjectId (ref: "Category", required),
  imageUrl: String,
  rating: { value: Number (0-5), count: Number },
  ratings: [ObjectId] (ref: "ratings"),
  numRatings: Number (min: 0),
  createdAt: Date (default: now)
}
```

### User Model
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  password: String (required),
  role: String (default: "CUSTOMER"),
  mobile: String,
  addresses: [ObjectId] (ref: "addresses"),
  paymentInformation: [ObjectId] (ref: "payment_information"),
  ratings: [ObjectId] (ref: "ratings"),
  reviews: [ObjectId] (ref: "reviews"),
  createdAt: Date (default: now)
}
```

### Order Model
```javascript
{
  user: ObjectId (ref: "users", required),
  orderItems: [ObjectId] (ref: "orderItems"),
  orderDate: Date (default: now),
  deliveryDate: Date,
  shippingAddress: ObjectId (ref: "addresses"),
  paymentDetails: { paymentMethod: String, transactionId: String, paymentId: String, paymentStatus: String },
  totalPrice: Number,
  totalDiscountedPrice: Number,
  discount: Number,
  orderStatus: String (default: "PENDING"),
  totalItem: Number,
  createdAt: Date (default: now)
}
```

### Cart Model
```javascript
{
  user: ObjectId (ref: "users"),
  cartItems: [ObjectId] (ref: "cartItems"),
  totalPrice: Number,
  totalItem: Number,
  totalDiscountedPrice: Number,
  discount: Number
}
```

## API Endpoints

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Authentication Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Order Endpoints
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get specific order

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Backend Setup
1. Clone the repository
2. Navigate to project root: `cd E-commercee`
3. Install dependencies: `npm install`
4. Create `.env` file with required variables
5. Start development server: `npm run dev`

### Frontend Setup
1. Navigate to frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Create `.env` file in src directory
4. Start development server: `npm run dev`

## Configuration

### Backend Environment Variables (.env)
```
PORT=9000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### Frontend Environment Variables (src/.env)
```
VITE_BACKEND_URL=http://localhost:9000
VITE_API_URL=http://localhost:3001
```

## Features

### Implemented Features
- ✅ User authentication (JWT)
- ✅ Product catalog with categories
- ✅ Shopping cart functionality
- ✅ Order management
- ✅ User profile management
- ✅ Responsive design with Tailwind CSS
- ✅ Material-UI components
- ✅ Product carousel
- ✅ Search and filtering

### Planned Features
- 🔄 Payment gateway integration (Razorpay)
- 🔄 Admin dashboard
- 🔄 Product reviews and ratings
- 🔄 Wishlist functionality
- 🔄 Email notifications
- 🔄 Inventory management

## Recent Issues & Fixes

### Issue: JSON Parsing Error
**Problem:** Frontend receiving HTML instead of JSON from API endpoints
**Root Cause:** Missing product routes in backend
**Solution:** 
1. Created `product.controller.js` with CRUD operations
2. Created `product.route.js` with route definitions
3. Added product routes to main `index.js`
4. Fixed port mismatch between frontend (.env) and backend (server.js)

### Issue: Database Connection
**Problem:** MongoDB connection warnings
**Solution:** Updated connection options to remove deprecated warnings

### Issue: Product Model Errors
**Problem:** Duplicate fields and syntax errors in product schema
**Solution:** 
1. Fixed mongoose import statement
2. Removed duplicate category field
3. Renamed conflicting rating field to ratings

## Development Commands

### Backend
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
node src/seedProducts.js  # Seed database with sample products
```

### Frontend
```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Database Seeding

Sample products can be added using the seed script:
```bash
node src/seedProducts.js
```

This adds 4 sample women's jeans products with:
- Different brands (Levi's, Zara, H&M, Forever 21)
- Various prices and discounts
- Different colors and sizes
- Sample ratings and reviews

## Troubleshooting

### Common Issues
1. **Port conflicts:** Ensure backend (9000) and frontend (5173) use different ports
2. **CORS errors:** Verify CORS is enabled in backend
3. **Database connection:** Check MongoDB URI and network access
4. **Environment variables:** Ensure all required variables are set
5. **Module imports:** Check for typos in import statements

### Debug Commands
```bash
# Check if ports are in use
netstat -ano | findstr :9000
netstat -ano | findstr :5173

# View server logs
npm run dev

# Test API endpoints
curl http://localhost:9000/api/products
```

---

**Last Updated:** August 21, 2025  
**Documentation Version:** 1.0  
**Project Status:** Active Development
