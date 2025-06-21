import React, { Suspense } from "react";
import SearchResults from "./SearchResults";

export default function SearchPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Search Results</h1>

      <Suspense fallback={<p>Loading search results...</p>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
