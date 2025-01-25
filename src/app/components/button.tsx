"use client";
import React from "react";
import { useStateContext } from "@/app/components/context/StateContext";

type ProductDetailsProps = {
  post: {
    _id: string;
    name: string;
    pricePerDay: string;
    
  };
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ post }) => {
  const { AddToCart } = useStateContext();

  const handleAddToCart = () => {
    
    const product = {
      id: post._id,
      name: post.name,
      price: post.pricePerDay,
    };
    console.log("Product to add:", product); 
    AddToCart(product, 1);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex text-sm ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
    >
      RENT NOW
    </button>
  );
};

export default ProductDetails;
