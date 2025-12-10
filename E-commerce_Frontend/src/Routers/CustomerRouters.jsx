import React from 'react';
import { Routes, Route } from "react-router-dom";


// Navigation and Layout Components
import Navigation from '../Customer/componants/Navigation/Navigation';
import Footer from "../Customer/componants/Footer/Footer";

// Page Components
import Homepage from "../Customer/Pages/HomePage/Homepage";
import Product from "../Customer/componants/Product/Product";
import ProductDetails from "../Customer/componants/ProductDetails/ProductDetails";
import Cart from "../Customer/componants/Cart/Cart";
import CheckOut from "../Customer/componants/CheckOut/CheckOut";
import Order from "../Customer/componants/Order/Order";
import OrderDetails from "../Customer/componants/Order/OrderDetails";

// Auth Components
import Login from "../Customer/componants/Auth/Login";
import Signup from "../Customer/componants/Auth/Signup";
import ProtectedRoute from "../components/ProtectedRoute";

// Profile Component
import Profile from "../Customer/componants/Profile/Profile";


// widget components 
import Widget from "../widget/widget";

const CustomerRouters = () => {
    return (
        <div>
            {/* Navigation - appears on all pages */}
            <div>
                <Widget/>
                <Navigation />
            </div>
            
            {/* Main Content Routes */}
            <Routes>
                {/* Home Page */}
                <Route path="/" element={<Homepage />} />
               
                
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Product Routes */}
                <Route path="/products" element={<Product />} />
                <Route path="/products/:category" element={<Product />} />
                <Route path="/products/:category/:subcategory" element={<Product />} />
                <Route path="/product/:productId" element={<ProductDetails />} />
                
                {/* Protected Routes */}
                <Route path="/cart" element={
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                } />
                <Route path="/checkout" element={
                    <ProtectedRoute>
                        <CheckOut />
                    </ProtectedRoute>
                } />
                
                {/* Profile - Protected */}
                <Route path="/account/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                
                {/* Order Management - Protected */}
                <Route path="/account/orders" element={
                    <ProtectedRoute>
                        <Order />
                    </ProtectedRoute>
                } />
                <Route path="/account/orders/:orderId" element={
                    <ProtectedRoute>
                        <OrderDetails />
                    </ProtectedRoute>
                } />
                
                {/* Dynamic Category Routes */}
                <Route path="/:levelOne" element={<Homepage />} />
                <Route path="/:levelOne/:levelTwo" element={<Homepage />} />
                <Route path="/:levelOne/:levelTwo/:levelThree" element={<Homepage />} />
                
                {/* 404 - Catch all route */}
                <Route path="*" element={<Homepage />} />
            </Routes>
            
            {/* Footer - appears on all pages */}
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default CustomerRouters;
