"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import HeroSection from "../components/HeroSection"; // Import the HeroSection component
import Footer from "../components/Footer";

interface Product {
  _id: string;
  name: string;
  price: number;
  slug: string;
  images: string[];
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart(); // Use the CartContext's addToCart

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data.data);
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product); // Add product to cart via context
    alert(`${product.name} added to cart!`);
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Product Listings */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Product Listings</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
