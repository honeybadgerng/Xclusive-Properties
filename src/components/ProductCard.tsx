// src/components/ProductCard.tsx
"use client";

import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  slug: string;
  images: string[];
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.images[0]} // Display the first image
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-md"
        />
        <div className="mt-4">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-blue-600">₦{product.price.toLocaleString()}</p>
        </div>
      </Link>
      <button
        onClick={() => onAddToCart(product)}
        className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
