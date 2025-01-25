"use client";
import React from "react";

const CheckoutPage: React.FC = () => {
    
  
  return (
    
      

      <main className="flex-1 flex flex-col items-center p-4">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="md:col-span-2 space-y-6">
            {/* Billing Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg text-blue-600 font-semibold mb-4">Billing Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Name" className="border rounded-lg py-2 px-3 w-full" />
                <input type="text" placeholder="Phone Number" className="border rounded-lg py-2 px-3 w-full" />
                <input type="text" placeholder="Address" className="border rounded-lg py-2 px-3 w-full" />
                <input type="text" placeholder="Area" className="border rounded-lg py-2 px-3 w-full" />
              </div>
            </div>

            {/* Rental Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg text-blue-600 font-semibold mb-4">Rental Info</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2 text-blue-600">Pick-Up</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="date" className="border rounded-lg py-2 px-3 w-full" />
                    <input type="text" placeholder="Location" className="border rounded-lg py-2 px-3 w-full" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-blue-600 mb-2">Drop-Off</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    <input type="date" className="border rounded-lg py-2 px-3 w-full" />
                    <input type="text" placeholder="Location" className="border rounded-lg py-2 px-3 w-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-blue-600 mb-4">Payment Method</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Card Number" className="border rounded-lg py-2 px-3 w-full" />
                  <input type="text" placeholder="Expiration Date (MM/YY)" className="border rounded-lg py-2 px-3 w-full" />
                  <input type="text" placeholder="Card Holder" className="border rounded-lg py-2 px-3 w-full" />
                  <input type="text" placeholder="CVC" className="border rounded-lg py-2 px-3 w-full" />
                </div>
               </div>
            </div>

            {/* Confirmation */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg text-blue-600 font-semibold mb-4">Confirmation</h2>
              <div className="space-y-2">
                <label className="flex items-center text-black space-x-2">
                  <input type="checkbox" />
                  <span>I agree with sending marketing and newsletter emails. No spam, promised!</span>
                </label>
                <label className="flex items-center text-black space-x-2">
                  <input type="checkbox" />
                  <span>I agree with the terms and conditions and privacy policy.</span>
                </label>
              </div>
              <button className="w-full bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 mt-4">
                Rent Now
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Rental Summary</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img src="/car-placeholder.png" alt="Car" className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h3 className="font-medium">Nissan GT - R</h3>
                  
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$80.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
              </div>
              <div className="mt-4 border-t pt-4 flex justify-between font-semibold">
                <span>Total Rental Price</span>
                <span>$80.00</span>
              </div>
              <div>
                <input type="text" placeholder="Apply promo code" className="border rounded-lg py-2 px-3 w-full mt-2" />
                <button className="w-full bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 mt-2">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
 );
};

export default CheckoutPage;
