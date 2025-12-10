import React from "react";
import { useNavigate } from "react-router-dom";
const HomeSectionCard = ({ product, index }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => {navigate(`/product/${product._id || product.id}`)}} className="pt-5 flex flex-col items-center justify-center bg-white shadow-lg rounded-lg overflow-hidden w-[15rem] mx-3 hover:shadow-xl transition-shadow duration-300 gap-6">
      <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg overflow-hidden w-[15rem] mx-3 hover:shadow-xl transition-shadow duration-300">
        <div className="h-[13rem] w-[10rem]">
          <img
            className="object-cover object-top w-full h-full hover:scale-110 transition-transform duration-300"
            src={product.imageUrl}
            alt={product.title || "Product Image"}
          />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.brand}</h3>
        <p className="text-gray-600">{product.title}</p>
        <span className="text-xl font-bold">{product.price}</span>
      </div>
    </div>
  );
};

export default HomeSectionCard;