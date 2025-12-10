import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="m-5 productImage p flex flex-col items-center justify-center bg-white shadow-lg rounded-lg overflow-hidden w-[15rem] mx-3 hover:shadow-xl transition-shadow duration-300 gap-6"
    >
      <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg overflow-hidden w-[15rem] mx-3 hover:shadow-xl transition-shadow duration-300">
        <div className="h-[13rem] w-[10rem]">
          <img
            className="object-cover object-top w-full h-full hover:scale-110 transition-transform duration-300"
            src={product.imageUrl}
            alt={product.title || "Product Image"}
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold">{product.brand || "Brand"}</h3>
        <p className="text-gray-600">{product.title || "Product title"}</p>
        <div className="flex items-center gap-2">
          <p className="text-xl font-bold">{product.discountedPrice}</p>
          <span className="line-through ">
            {product.price || "Product price"}
          </span>
          <p className="text-green-600">{product.discountPersent}% off</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
