import Link from "next/link";
import { client } from "@/sanity/client";
import HeroSection from "./components/herosection";
import SearchFilters from "./components/searchfilters";

const CARS_QUERY = `*[
  _type == "car" && defined(name)
] | order(_createdAt desc)[0...12] {
  _id,
  name,
  brand,
  type,
  fuelCapacity,
  transmission,
  seatingCapacity,
  pricePerDay,
  originalPrice,
  tags,
  "imageUrl": image.asset->url
}`;

const options = { next: { revalidate: 30 } };

interface Car {
  _id: string;
  name: string;
  brand: string;
  type: string;
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: string;
  pricePerDay: string;
  originalPrice: string;
  tags: string[];
  imageUrl: string;
}

export default async function CarsPage() {
  let cars: Car[] = [];

  try {
    cars = await client.fetch<Car[]>(CARS_QUERY);
  } catch (error) {
    console.error("Error fetching cars:", error);
  }

  return (
    <>
      <div className="bg-gray-100">
      <div>

      <HeroSection />
      </div>
       

        <div>
        <SearchFilters />
        </div>
        
        <main>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {cars.map((car) => (
          <Link
          key={car._id}
          href={`product/${car._id}`}
          className="bg-white p-4 rounded shadow hover:shadow-lg transition"
        >

        <img src={car.imageUrl}
        alt={car.name} 
        className="w-full h-40 object-top rounded mb-4"/> 
         <h3 className="text-lg text-black font-bold">{car.name}</h3>
              <p className="text-sm text-gray-500">{car.type}</p>
              <p className="text-sm text-gray-500">
                {car.seatingCapacity} Seats
              </p>
              <p className="text-sm text-gray-500">
                Transmission: {car.transmission}
              </p>
              <p className="text-blue-600 font-bold mt-2">
                {car.originalPrice} {car.pricePerDay}/day
              </p>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                Rent Now
              </button>    
          
          </Link>
        ))}
        </div>
        </main>
          
      </div>
    </>
  );
}