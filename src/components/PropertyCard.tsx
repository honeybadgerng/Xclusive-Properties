"use client";

import React from "react";
import Link from "next/link";
import { Bed, Bath, MapPin, MaximizeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface PropertyCardData {
  _id: string;
  title: string;
  slug: string;
  state: string;
  city: string;
  street: string;
  category: "for sale" | "for rent" | "short-let" | "joint venture";
  price: number;
  usdtPrice: number;
  bedrooms?: number;
  bathrooms?: number;
  totalArea?: number;
  images: string[];
}

const PropertyCard: React.FC<{ property: PropertyCardData }> = ({
  property,
}) => {
  const {
    slug,
    title,
    state,
    city,
    street,
    category,
    price,
    usdtPrice,
    bedrooms,
    bathrooms,
    totalArea,
    images,
  } = property;

  const imageUrl = images?.[0] || "/placeholder.jpg"; // fallback if no image

  const formatPrice = (val: number) =>
    val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const getBadgeVariant = () => {
    switch (category) {
      case "for sale":
        return "default";
      case "for rent":
        return "secondary";
      case "short-let":
        return "outline";
      case "joint venture":
        return "destructive";
      default:
        return "default";
    }
  };

  const getTypeLabel = () => {
    switch (category) {
      case "for sale":
        return "For Sale";
      case "for rent":
        return "For Rent";
      case "short-let":
        return "Short Let";
      case "joint venture":
        return "Joint Venture";
      default:
        return "";
    }
  };

  return (
    <Link href={`/properties/${slug}`} className="group">
      <div className="bg-card rounded-lg overflow-hidden transition-all duration-300 hover:translate-y-[-5px] property-card-shadow">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <Badge
            className={`absolute top-3 left-3 ${
              category === "short-let"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : ""
            }`}
            variant={getBadgeVariant()}
          >
            {getTypeLabel()}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>

          <div className="flex items-center text-muted-foreground text-sm mt-1">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span className="line-clamp-1">{`${street}, ${city}, ${state}`}</span>
          </div>

          {/* Price */}
          <div className="mt-3 mb-4">
            <div className="text-lg font-bold">₦{formatPrice(price)}</div>
            <div className="text-xs text-muted-foreground">
              USDT {usdtPrice}
            </div>
          </div>

          {/* Features */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center text-muted-foreground text-sm">
              <Bed className="h-4 w-4 mr-1" />
              <span>
                {bedrooms ?? 0} {bedrooms === 1 ? "Bed" : "Beds"}
              </span>
            </div>
            <div className="flex items-center text-muted-foreground text-sm">
              <Bath className="h-4 w-4 mr-1" />
              <span>
                {bathrooms ?? 0} {bathrooms === 1 ? "Bath" : "Baths"}
              </span>
            </div>
            <div className="flex items-center text-muted-foreground text-sm">
              <MaximizeIcon className="h-4 w-4 mr-1" />
              <span>{totalArea ?? 0} m²</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
