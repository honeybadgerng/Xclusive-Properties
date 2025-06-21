"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const SearchBar = () => {
  const [query, setQuery] = useState(""); // User input
  const [suggestions, setSuggestions] = useState([]); // Search suggestions
  const router = useRouter();

  // Fetch search suggestions
  useEffect(() => {
    if (query.length > 2) {
      axios
        .get(`/api/search?q=${query}`)
        .then((res) => setSuggestions(res.data.suggestions || [])) // Ensure an empty array if undefined
        .catch((err) => {
          console.error("❌ Suggestion fetch error:", err);
          setSuggestions([]); // Handle the error by setting an empty array
        });
    } else {
      setSuggestions([]); // Clear suggestions when query is too short
    }
  }, [query]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${query}`);
    }
  };

  return (
    <div className="relative w-full max-w-lg">
      <form
        onSubmit={handleSearch}
        className="flex items-center border border-gray-300 rounded-md"
      >
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border-none outline-none text-black placeholder-gray-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-r-md"
        >
          🔍
        </button>
      </form>

      {/* Search Suggestions */}
      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-md shadow-md mt-1">
          {suggestions.map((item: any, index: number) => (
            <li
              key={index}
              onClick={() => router.push(`/search?q=${item.name}`)}
              className="p-2 hover:bg-gray-100 cursor-pointer text-black"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
