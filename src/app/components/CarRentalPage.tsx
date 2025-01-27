import Link from "next/link";
import { client } from "@/sanity/client";

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
    <div className="bg-gray-100 min-h-screen">
      <main className="ml-1/4 p-4">
      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          
          {cars.map((product) => (
            <Link
              key={product._id}
              href={`product/${product._id}`}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition"
            >
              <div>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-40 object-center rounded mb-4"
                />
                <h3 className="text-lg text-black font-bold">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.type}</p>
                <p className="text-sm text-gray-500">
                  {product.seatingCapacity} Seats
                </p>
                <p className="text-sm text-gray-500">
                  Transmission: {product.transmission}
                </p>
                <p className="text-blue-600 font-bold mt-2">
                  {product.originalPrice} {product.pricePerDay}/day
                </p>
                <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                  Rent Now
                </button>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}