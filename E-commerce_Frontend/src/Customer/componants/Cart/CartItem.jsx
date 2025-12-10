import React from "react";
import { IconButton, Button } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="m-5 p-5 shadow-lg border-gray-500 rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem] mt-3 bg-gray-200">
          <img
            src={item.imageUrl || "https://via.placeholder.com/150x150?text=No+Image"}
            alt={item.title || "Product Image"}
            className="object-cover object-top w-full h-full"
          />
        </div>
        <div className="ml-4 space-y-1">
          <p className="text-lg font-semibold">{item.title}</p>
          <p className="text-gray-500 opacity-70">Size: {item.selectedSize || 'M'} | Color: {item.color}</p>
          <p className="text-gray-500 opacity-70">
            Brand: {item.brand}
          </p>
          <div className="flex gap-2">
            <p className="text-black font-bold">₹{item.discountedPrice}</p>
            <p className="text-gray-500 opacity-70 line-through">₹{item.price}</p>
            <p className="font-semibold text-green-600">{item.discountPersent}% off</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center lg:space-x-2 mt-2 gap-5">
          <IconButton onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
            <RemoveCircleOutlineIcon />
          </IconButton>
          <span className="">{item.quantity}</span>
          <IconButton onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
            <AddCircleOutlineIcon />
          </IconButton>
          <Button 
            onClick={() => onRemove(item.id)}
            className="cursor-pointer text-red-600 hover:text-red-800"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
