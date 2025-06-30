"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search } from "lucide-react";

const priceOptions = [
  100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000,
  1000000, 2000000, 3000000, 5000000, 10000000, 20000000, 40000000, 60000000,
  80000000, 100000000, 150000000,
];
const above150M = "above-150m";

const basicFacilities = [
  "CCTV surveillance",
  "Swimming pool",
  "Wardrobes / Closets",
  "Fitted kitchen",
  "Security doors / burglary proof",
];

const subtypes: { [key: string]: string[] } = {
  "flat/apartment": [
    "Mini Flat",
    "Self Contain",
    "Studio Apartment",
    "Penthouse",
    "Maisonette",
    "Loft",
    "Duplex",
    "Block of Flats",
  ],
  house: [
    "Detached Bungalow",
    "Detached Duplex",
    "Semi-Detached Bungalow",
    "Semi-Detached Duplex",
    "Terraced Bungalow",
    "Terraced Duplex",
  ],
  land: [
    "Residential Land",
    "Commercial Land",
    "Industrial Land",
    "Mixed-use Land",
    "Agricultural Land",
    "Other Land",
  ],
  "commercial property": [
    "Office Space",
    "Shop",
    "Warehouse",
    "Hotel/Guest House",
    "Event Centre",
    "Restaurant",
    "Filling Station",
    "Other Commercial",
  ],
};

type Filters = {
  location: string;
  type: string;
  subtype: string;
  category: string;
  marketStatus: string;
  beds: string;
  toilets: string;
  bathrooms: string;
  parkingSpaces: string;
  minPrice: string;
  maxPrice: string;
  furnished: boolean;
  serviced: boolean;
  featured: boolean;
  premium: boolean;
  facilities: string[];
  q: string;
};

const PropertySearch = ({ onSearch }: { onSearch: (filters: any) => void }) => {
  const [filters, setFilters] = useState<Filters>({
    location: "",
    type: "",
    subtype: "",
    category: "",
    marketStatus: "",
    beds: "",
    toilets: "",
    bathrooms: "",
    parkingSpaces: "",
    minPrice: "",
    maxPrice: "",
    furnished: false,
    serviced: false,
    featured: false,
    premium: false,
    facilities: [],
    q: "",
  });

  const [showMore, setShowMore] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFacility = (item: string) => {
    setFilters((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(item)
        ? prev.facilities.filter((f) => f !== item)
        : [...prev.facilities, item],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: Record<string, any> = {};

    for (const [key, value] of Object.entries(filters)) {
      if (value === "" || value === undefined || value === null) continue;

      // Handle facilities[]
      if (key === "facilities" && Array.isArray(value)) {
        payload.facilities = value;
      }
      // Handle boolean flags
      else if (["furnished", "serviced", "featured", "premium"].includes(key)) {
        if (value === true) payload[key] = "true";
      }
      // Handle everything else
      else {
        payload[key] = value;
      }
    }

    // Remove maxPrice if it's "above-150m"
    if (payload.maxPrice === above150M) {
      delete payload.maxPrice;
    }

    console.log("Search filters sent:", payload); // ✅ For debugging

    onSearch(payload);
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Keyword search */}
          <div>
            <Label>Keyword (e.g., Lekki, Duplex)</Label>
            <Input
              placeholder="Any keyword"
              value={filters.q}
              onChange={(e) => handleChange("q", e.target.value)}
            />
          </div>

          <div>
            <Label>Location </Label>
            <Input
              placeholder="City, Area or State"
              value={filters.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />
          </div>

          <div>
            <Label>Property Type</Label>
            <Select
              value={filters.type}
              onValueChange={(value) => handleChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flat/apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="land">Land</SelectItem>
                <SelectItem value="commercial property">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filters.type && (
            <div>
              <Label>Subtype</Label>
              <Select
                value={filters.subtype}
                onValueChange={(value) => handleChange("subtype", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subtype" />
                </SelectTrigger>
                <SelectContent>
                  {(subtypes[filters.type] || []).map((sub) => (
                    <SelectItem key={sub} value={sub}>
                      {sub}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label>Min Price</Label>
            <Select
              value={filters.minPrice}
              onValueChange={(value) => handleChange("minPrice", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select min" />
              </SelectTrigger>
              <SelectContent>
                {priceOptions.map((price) => (
                  <SelectItem key={price} value={price.toString()}>
                    ₦{price.toLocaleString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Max Price</Label>
            <Select
              value={filters.maxPrice}
              onValueChange={(value) => handleChange("maxPrice", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select max" />
              </SelectTrigger>
              <SelectContent>
                {priceOptions.map((price) => (
                  <SelectItem key={price} value={price.toString()}>
                    ₦{price.toLocaleString()}
                  </SelectItem>
                ))}
                <SelectItem value={above150M}>Above ₦150M</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {!showMore && (
          <Button
            type="button"
            variant="ghost"
            className="mt-4 text-sm underline"
            onClick={() => setShowMore(true)}
          >
            More Search Options
          </Button>
        )}

        {showMore && (
          <>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label>Category</Label>
                <Select
                  value={filters.category}
                  onValueChange={(value) => handleChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="for sale">For Sale</SelectItem>
                    <SelectItem value="for rent">For Rent</SelectItem>
                    <SelectItem value="short-let">Short-let</SelectItem>
                    <SelectItem value="joint venture">Joint Venture</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Market Status</Label>
                <Select
                  value={filters.marketStatus}
                  onValueChange={(value) => handleChange("marketStatus", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {["beds", "toilets", "bathrooms", "parkingSpaces"].map(
                (field) => (
                  <div key={field}>
                    <Label className="capitalize">{field}</Label>
                    <Input
                      type="number"
                      placeholder={`Enter ${field}`}
                      value={(filters as any)[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                    />
                  </div>
                )
              )}

              {["furnished", "serviced", "featured", "premium"].map((field) => (
                <div key={field}>
                  <Label className="capitalize">{field}</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="checkbox"
                      checked={(filters as any)[field]}
                      onChange={(e) => handleChange(field, e.target.checked)}
                    />
                    <span>{field}</span>
                  </div>
                </div>
              ))}

              <div className="col-span-full">
                <Label>Facilities</Label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {basicFacilities.map((item) => (
                    <label key={item} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.facilities.includes(item)}
                        onChange={() => toggleFacility(item)}
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              className="mt-4 text-sm underline"
              onClick={() => setShowMore(false)}
            >
              Hide More Options
            </Button>
          </>
        )}

        <Button
          type="submit"
          className="w-full mt-6 bg-secondary hover:bg-secondary/90 text-primary"
        >
          <Search className="h-4 w-4 mr-2" />
          Search Properties
        </Button>
      </form>
    </div>
  );
};

export default PropertySearch;
