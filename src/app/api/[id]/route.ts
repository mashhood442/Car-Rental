import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { Context } from "react";
const filepath = path.join(process.cwd(), "src", "data", "rental-car-data.json");

type Product = {
  id: number;
  name: string;
  type: string;
  fuel_capacity: string;
  transmission: string;
  seating_capacity: string;
  currency: string;
  price_per_day: number;
  image_url: string;
  tags: string[];
};

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params; // Extract ID from URL using params
    
    

    const fileContent = await fs.readFile(filepath, "utf-8");
    const products: Product[] = JSON.parse(fileContent);

  
    const product = products.find((p) => p.id === Number(id));

    
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    
    return NextResponse.json(product);
  } catch (error) {
    let errorMessage = "An unexpected error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

 
    return NextResponse.json(
      { message: "Failed to fetch product", error: errorMessage },
      { status: 500 }
    );
  }
}
