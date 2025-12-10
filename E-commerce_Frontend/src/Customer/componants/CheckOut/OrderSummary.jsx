import React, { useState, useEffect } from 'react'
import AddressCard from "../AdressCard/AddressCard";
import { Typography, Divider } from '@mui/material';

const OrderSummary = ({ deliveryAddress }) => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    // Use passed address or load from localStorage
    if (deliveryAddress) {
      setAddress(deliveryAddress);
    } else {
      const savedAddress = localStorage.getItem('deliveryAddress');
      if (savedAddress) {
        setAddress(JSON.parse(savedAddress));
      }
    }
  }, [deliveryAddress]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.discountedPrice * item.quantity);
    }, 0);
  };

  const calculateOriginalTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="space-y-6">
      {/* Delivery Address Section */}
      <div className="p-5 shadow-lg rounded-md border">
        <Typography variant="h6" className="mb-4 font-semibold">
          Delivery Address
        </Typography>
        {address ? (
          <div className="space-y-2">
            <p className="font-medium">{address.firstName} {address.lastName}</p>
            <p className="text-gray-600">{address.street}</p>
            <p className="text-gray-600">{address.city}, {address.state} {address.postalCode}</p>
            <p className="text-gray-600">Phone: {address.phone}</p>
          </div>
        ) : (
          <AddressCard />
        )}
      </div>

      {/* Order Items Section */}
      <div className="p-5 shadow-lg rounded-md border">
        <Typography variant="h6" className="mb-4 font-semibold">
          Order Items ({getTotalItems()} items)
        </Typography>
        
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
              <img
                src={item.imageUrl || "https://via.placeholder.com/80x80?text=No+Image"}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium">{item.title}</h4>
                <p className="text-sm text-gray-500">Size: {item.selectedSize} | Color: {item.color}</p>
                <p className="text-sm text-gray-500">Brand: {item.brand}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="font-semibold">₹{item.discountedPrice}</span>
                  <span className="text-sm text-gray-500 line-through">₹{item.price}</span>
                  <span className="text-sm text-green-600">{item.discountPersent}% off</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                <p className="font-semibold">₹{item.discountedPrice * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <Divider className="my-4" />
        
        {/* Price Summary */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Price ({getTotalItems()} items)</span>
            <span>₹{calculateOriginalTotal()}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-₹{calculateOriginalTotal() - calculateTotal()}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charges</span>
            <span className="text-green-600">Free</span>
          </div>
          <Divider />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total Amount</span>
            <span>₹{calculateTotal()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary;
