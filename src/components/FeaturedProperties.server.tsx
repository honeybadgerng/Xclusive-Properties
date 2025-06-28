import React from "react";
import type { PropertyCardData } from "./PropertyCard";
import FeaturedPropertiesClient from "./FeaturedPropertiesClient";

async function fetchFeaturedProperties(): Promise<PropertyCardData[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/featured`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch featured properties");
  return res.json();
}

const FeaturedProperties = async () => {
  const properties = await fetchFeaturedProperties();

  return <FeaturedPropertiesClient properties={properties} />;
};

export default FeaturedProperties;
