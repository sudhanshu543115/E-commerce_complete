import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setLoading(false);
  }, []);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const updatedItems = cartItems.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeFromCart = (productId) => {
    const updatedItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('cartUpdated'));
  };

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

  const handleCheckout = () => {
    navigate("/checkout?step=2");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="">
      <div className=" lg:grid grid-cols-3 lg:px-16 relative">
        <div className="col-span-2">
          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <h2 className="text-2xl font-semibold text-gray-600">Your cart is empty</h2>
              <p className="text-gray-500 mt-2">Add some products to get started!</p>
              <button 
                onClick={() => navigate('/')}
                className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem 
                key={item.id} 
                item={item} 
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />))
          )}
        </div>
        <div className=" m-5 rounded p-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 ">
          <div className="border-gray-500 p-5 rounded shadow-lg">
            <p className=" uppercase font-bold opacity-60 pb-4">
              {" "}
              Price Details
            </p>
            <hr className="border-t border-gray-300" />
            <div className="flex justify-between py-2">
              <span>Price ({getTotalItems()} items)</span>
              <span>₹{calculateOriginalTotal()}</span>
            </div>
            <div className="flex justify-between py-2">
              <p>Discount</p>
              <p className="text-green-600">-₹{calculateOriginalTotal() - calculateTotal()}</p>
            </div>
            <div className="flex justify-between py-2">
              <p>Delivery Charge</p>
              <p>Free</p>
            </div>
            <div className="flex justify-between py-2">
              <p className="font-bold">Total</p>
              <p className="font-bold">₹{calculateTotal()}</p>
            </div>
             <hr className="border-t border-gray-300" />
          <button 
            onClick={handleCheckout} 
            disabled={cartItems.length === 0}
            className={`mt-5 rounded h-9 cursor-pointer mr-5 flex justify-center items-center w-full text-white ${
              cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-violet-500 hover:bg-violet-600'
            }`}
          >
            Check out
          </button>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Cart;
