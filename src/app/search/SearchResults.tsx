"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      axios
        .get(`/api/search?q=${query}`)
        .then((res) => {
          setResults(res.data.products);
        })
        .catch((err) => console.error("❌ Search error:", err));
    }
  }, [query]);

  return (
    <div>
      <h2 className="text-lg font-medium">Results for "{query}"</h2>
      {results.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {results.map((product: any) => (
            <Link
              key={product._id}
              href={`/product/${product.slug}`}
              className="border p-2 rounded-md hover:shadow transition block"
            >
              <img
                src={product.images?.[0] || "/no-image.png"}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <h2 className="text-sm font-medium mt-2">{product.name}</h2>
              <p className="text-sm text-gray-500">₦{product.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
