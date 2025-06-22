"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import HeroSection from "../components/HeroSection"; // Import the HeroSection component
import Footer from "../components/Footer";
import PropertySearch from "../components/PropertySearch"; // Import the PropertySearch component
import FeaturedProperties from "../components/FeaturedProperties"; // Import the FeaturedProperties component
import FeatureSection from "@/components/FeatureSection";
import TestimonialSection from "@/components/TestimonialSection";
import CallToAction from "@/components/CallToAction";
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

  const handleSearch = (filters: any) => {
    console.log("Search filters:", filters);
    // In a real app, we would use these filters to fetch properties from an API
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <PropertySearch onSearch={handleSearch} />
      </div>
      <FeaturedProperties />
      <FeatureSection />
      <TestimonialSection />
      <CallToAction />
      <Footer />
    </div>
  );
}
