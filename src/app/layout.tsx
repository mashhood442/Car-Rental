"use client"; 


import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/nav";
import Footer from "./components/footer";
import { StateContext } from "./components/context/StateContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StateContext>      
         
          <main className="min-h-screen bg-gray-100">
            <Navbar />
            <div>{children}</div>
            <Footer />
          </main>
        
        </StateContext>
  
      </body>
    </html>
  );
}
