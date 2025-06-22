import React from "react";
import Link from "next/link";
import { Bed, Bath, MapPin, MaximizeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface PropertyProps {
  id: string;
  title: string;
  location: string;
  price: {
    naira: number;
    pi: number;
  };
  bedrooms: number;
  bathrooms: number;
  size: number;
  type: "sale" | "rent" | "short-let";
  imageUrl: string;
}

const PropertyCard: React.FC<PropertyProps> = ({
  id,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  size,
  type,
  imageUrl,
}) => {
  // Format price with commas
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Determine badge color based on property type
  const getBadgeVariant = () => {
    switch (type) {
      case "sale":
        return "default";
      case "rent":
        return "secondary";
      case "short-let":
        return "outline";
      default:
        return "default";
    }
  };

  // Get label text based on property type
  const getTypeLabel = () => {
    switch (type) {
      case "sale":
        return "For Sale";
      case "rent":
        return "For Rent";
      case "short-let":
        return "Short Let";
      default:
        return "";
    }
  };

  return (
    <Link href={`/properties/${id}`} className="group">
      <div className="bg-card rounded-lg overflow-hidden transition-all duration-300 hover:translate-y-[-5px] property-card-shadow">
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <Badge className="absolute top-3 left-3" variant={getBadgeVariant()}>
            {getTypeLabel()}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>

          <div className="flex items-center text-muted-foreground text-sm mt-1">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span className="line-clamp-1">{location}</span>
          </div>

          {/* Price */}
          <div className="mt-3 mb-4">
            <div className="text-lg font-bold">₦{formatPrice(price.naira)}</div>
            <div className="text-xs text-muted-foreground">Pi {price.pi}</div>
          </div>

          {/* Property Features */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center text-muted-foreground text-sm">
              <Bed className="h-4 w-4 mr-1" />
              <span>
                {bedrooms} {bedrooms === 1 ? "Bed" : "Beds"}
              </span>
            </div>
            <div className="flex items-center text-muted-foreground text-sm">
              <Bath className="h-4 w-4 mr-1" />
              <span>
                {bathrooms} {bathrooms === 1 ? "Bath" : "Baths"}
              </span>
            </div>
            <div className="flex items-center text-muted-foreground text-sm">
              <MaximizeIcon className="h-4 w-4 mr-1" />
              <span>{size} m²</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
