import React from "react";
import Link from "next/link";

const heroStyle = {
  backgroundImage: `url('https://project-morent.vercel.app/static/media/hero.c422078b650affce4d14.png')`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat', 
  backgroundPosition: 'center',
  height: '300px', 
  borderRadius: '10px',
};

const heroStyle2 = {
  backgroundImage: `url('https://project-morent.vercel.app/static/media/car_3.e54c8f73902c80ddbd28.png')`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat', 
  backgroundPosition: 'center',
  height: '300px', 
  borderRadius: '10px',
};


const HeroSection: React.FC = () => {
  return (
<div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-6 p-6 bg-blue-50">
      <div className="flex-1 bg-blue-100 p-6 rounded-lg shadow" style={heroStyle}>
        <h2 className="text-2xl font-bold text-blue-800">
          The Best Platform for Car Rental
        </h2>
        <p className="mt-1 text-md text-white font-bold">
          Ease of doing a car rental safely and reliably. Of course, at a low price.
        </p>
        <button className="mt-10 px-6 py-2 bg-blue-600 text-white rounded-lg" >
        <Link href="/cars">
          Rental Car
          </Link>
        </button>
      </div>


      <div className="flex-1  bg-blue-100 p-6 rounded-lg shadow " style={heroStyle2}>
        <h2 className="text-2xl font-bold text-blue-800">
          Easy way to rent a car at a low price
        </h2>
        <p className="mt-1 text-white font-bold text-md">
          Providing cheap car rental services and safe and comfortable facilities.
        </p>
        <button className="mt-10 px-6 py-2 bg-blue-600 text-white rounded-lg">
        <Link href="/cars">
          Rental Car
          </Link>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
