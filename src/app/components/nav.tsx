"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { GrSubtractCircle } from "react-icons/gr";
import { useStateContext } from "./context/StateContext"; 

const Navbar = () => {
  const {
    CartItem,
    subTotal,
    totalQuantities,
    incQty,
    decQty,
    AddToCart,
  } = useStateContext(); 

  const ref = useRef<HTMLDivElement | null>(null);

  const toggleCart = () => {
    if (ref.current) {
      const classList = ref.current.classList;
      classList.toggle("translate-x-full");
      classList.toggle("translate-x-0");
    }
  };

  return (
    <div>
      <nav className="flex flex-wrap justify-between items-center w-full p-8 bg-white shadow-lg relative">
        {/* Logo */}
        <div className="px-2 flex mx-2">
          <h1 className="text-blue-600 text-3xl font-bold mr-6">MORENT</h1>
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-row gap-6 text-blue-600 ml-auto font-semibold">
          <li className="hover:text-blue-950 mt-1">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-blue-950 mt-1">
            <Link href="/cars">Cars</Link>
          </li>
          <li className="hover:text-blue-950 mt-1">
            <Link href="/signup">Sign Up</Link>
          </li>
        </ul>

        {/* Cart Icon */}
        <button onClick={toggleCart} className="relative">
          <CiShoppingCart className="w-7 h-7 text-blue-600 mr-2 hover:text-blue-950 transition duration-200" />
          {totalQuantities > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalQuantities}
            </span>
          )}
        </button>
      </nav>

      {/* Cart Sidebar */}
      <div
        ref={ref}
        className="cart fixed right-0 top-0 h-full bg-gray-900 text-gray-300 rounded-lg shadow-lg transition-transform translate-x-full w-80 sm:w-96 z-50 p-4 overflow-y-auto"
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <span className="text-lg font-semibold text-gray-100">Shopping Cart</span>
          <MdCancel
            onClick={toggleCart}
            className="text-gray-400 cursor-pointer hover:text-red-600 w-6 h-6"
          />
        </div>

        {CartItem.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Your cart is empty.</div>
        ) : (
          <ol className="space-y-4">
            {CartItem.map((item, index) => (
              <li key={index} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-400">Quantity: {item.quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <IoAddCircleOutline
                    onClick={() => AddToCart(item, 1)}
                    className="cursor-pointer text-green-500 w-5 h-5"
                  />
                  <span className="text-gray-200">{item.quantity}</span>
                  <GrSubtractCircle
                    onClick={() => decQty()}
                    className="cursor-pointer text-red-500 w-5 h-5"
                  />
                </div>
                <span className="font-semibold text-gray-300">
  {item.price ? (parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity).toFixed(2) : 0} RS
</span>

              </li>
            ))}
          </ol>
        )}

        {/* Cart Summary */}
        <div className="flex justify-between items-center mt-6 border-t pt-4">
          
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <Link href="/checkout">
            Checkout
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
