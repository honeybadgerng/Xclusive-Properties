import React from "react";
import PropertyCard, { PropertyProps } from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Sample property data
const FEATURED_PROPERTIES: PropertyProps[] = [
  {
    id: "1",
    title: "Luxury Apartment in Ikoyi",
    location: "Ikoyi, Lagos",
    price: {
      naira: 75000000,
      pi: 150000,
    },
    bedrooms: 3,
    bathrooms: 3,
    size: 200,
    type: "sale",
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Modern Duplex in Lekki",
    location: "Lekki Phase 1, Lagos",
    price: {
      naira: 120000000,
      pi: 240000,
    },
    bedrooms: 5,
    bathrooms: 6,
    size: 350,
    type: "sale",
    imageUrl:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Executive Apartment in Victoria Island",
    location: "Victoria Island, Lagos",
    price: {
      naira: 2500000,
      pi: 5000,
    },
    bedrooms: 2,
    bathrooms: 2,
    size: 120,
    type: "rent",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Premium Short-let in Banana Island",
    location: "Banana Island, Lagos",
    price: {
      naira: 100000,
      pi: 200,
    },
    bedrooms: 3,
    bathrooms: 3,
    size: 150,
    type: "short-let",
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
  },
];

const FeaturedProperties: React.FC = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Properties
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties available
            across Nigeria
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {FEATURED_PROPERTIES.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-secondary hover:bg-secondary/90 text-primary">
            View All Properties
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
