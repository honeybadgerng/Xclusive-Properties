"use client";

import React, { useEffect, useState } from "react";
import PropertyCard, { PropertyCardData } from "@/components/PropertyCard";
import PropertySearch from "@/components/PropertySearch";
import { Button } from "@/components/ui/button";
import { Filter, Grid3X3, List } from "lucide-react";
import Link from "next/link";

const PropertiesPage = () => {
  const [properties, setProperties] = useState<PropertyCardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const fetchProperties = async (filters: any = {}) => {
    setLoading(true);
    const params = new URLSearchParams();

    if (filters.location) params.append("location", filters.location);
    if (filters.type) params.append("type", filters.type);
    if (filters.purpose) params.append("purpose", filters.purpose);
    if (filters.beds) params.append("beds", filters.beds);
    if (filters.priceRange) {
      params.append("minPrice", filters.priceRange[0]);
      params.append("maxPrice", filters.priceRange[1]);
    }

    try {
      const res = await fetch(`/api/properties?${params.toString()}`);
      const data = await res.json();
      setProperties(data);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProperties(); // Load all on first render
  }, []);

  return (
    <section className="bg-background min-h-screen">
      {/* Filters */}
      <div className="bg-primary text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">Browse Properties</h1>
          <p className="mt-2 text-white/80">
            Find your perfect property from our listings
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Filter Properties</h2>
          <PropertySearch onSearch={fetchProperties} />
        </div>

        <div className="grid grid-cols-1 ">
          {/* Properties */}
          <div className="lg:col-span-3">
            {/* View toggle and count */}
            <div className="flex flex-wrap justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {loading
                  ? "Loading..."
                  : `${properties.length} ${
                      properties.length === 1 ? "Property" : "Properties"
                    } Found`}
              </h2>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground mr-2">
                  View:
                </span>
                <Button
                  variant={view === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView("grid")}
                  className="px-2"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView("list")}
                  className="px-2"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Grid View */}
            {view === "grid" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            )}

            {/* List View */}
            {view === "list" && (
              <div className="space-y-6">
                {properties.map((property) => (
                  <Link
                    key={property._id}
                    href={`/properties/${property.slug}`}
                    className="block group"
                  >
                    <div className="flex flex-col md:flex-row bg-card rounded-lg overflow-hidden border border-border transition-transform duration-200 group-hover:shadow-lg group-hover:-translate-y-1">
                      <div className="md:w-1/3 relative">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover aspect-video md:aspect-auto"
                        />
                      </div>
                      <div className="p-6 md:w-2/3 flex flex-col">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {property.title}
                        </h3>
                        <p className="text-muted-foreground mb-2">
                          {property.street}, {property.city}, {property.state}
                        </p>
                        <div className="mt-auto">
                          <div className="text-xl font-bold mb-1">
                            ₦
                            {property.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {property.usdtPrice && `USDT ${property.usdtPrice}`}
                          </div>
                          <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                            <div className="flex space-x-4 text-sm text-muted-foreground">
                              <span>{property.bedrooms} Beds</span>
                              <span>{property.bathrooms} Baths</span>
                              <span>{property.totalArea} m²</span>
                            </div>
                            <span className="text-sm text-secondary font-medium group-hover:underline">
                              View Details →
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && properties.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">
                  No properties found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search filters to find properties.
                </p>
                <Button variant="outline" onClick={() => fetchProperties()}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertiesPage;
