import React from "react";
import Property from "@/models/Property";
import dbConnect from "@/utils/dbConnect";
import PropertyCard, { PropertyCardData } from "@/components/PropertyCard";

export default async function PropertiesPage() {
  await dbConnect();

  const rawProperties = await Property.find({}).lean();

  const properties: PropertyCardData[] = rawProperties.map((property: any) => ({
    _id: property._id.toString(),
    title: property.title,
    slug: property.slug,
    state: property.state,
    city: property.city,
    street: property.street,
    category: property.category,
    price: property.price,
    usdtPrice: property.usdtPrice,
    bedrooms: property.bedrooms || 0,
    bathrooms: property.bathrooms || 0,
    totalArea: property.totalArea || 0,
    images: property.images || [],
  }));

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">All Properties</h2>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No properties found.</p>
        )}
      </div>
    </section>
  );
}
