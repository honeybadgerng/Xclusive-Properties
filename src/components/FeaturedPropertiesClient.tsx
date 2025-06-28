"use client";

import React, { useEffect } from "react";
import PropertyCard from "./PropertyCard";
import type { PropertyCardData } from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface FeaturedPropertiesClientProps {
  properties: PropertyCardData[];
}

const FeaturedPropertiesClient: React.FC<FeaturedPropertiesClientProps> = ({
  properties,
}) => {
  useEffect(() => {
    console.log("Fetched properties:", properties);
  }, [properties]);
  const router = useRouter();
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
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={() => router.push("/properties")}
            className="bg-secondary hover:bg-secondary/90 text-primary"
          >
            View All Properties
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPropertiesClient;
