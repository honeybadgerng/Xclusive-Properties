"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface PropertySearchProps {
  onSearch: (filters: any) => void;
}

const PropertySearch: React.FC<PropertySearchProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    priceRange: [0, 100000000], // in Naira
    beds: "",
    purpose: "",
  });

  const handleChange = (name: string, value: any) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handlePriceChange = (value: number[]) => {
    setFilters({
      ...filters,
      priceRange: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  // Format price with commas
  const formatPrice = (price: number) => {
    return `₦${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="City, Area or State"
              value={filters.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="type">Property Type</Label>
            <Select
              value={filters.type}
              onValueChange={(value: any) => handleChange("type", value)}
            >
              <SelectTrigger id="type" className="mt-1">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="land">Land</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="purpose">Purpose</Label>
            <Select
              value={filters.purpose}
              onValueChange={(value: any) => handleChange("purpose", value)}
            >
              <SelectTrigger id="purpose" className="mt-1">
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
                <SelectItem value="short-let">Short Let</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="beds">Bedrooms</Label>
            <Select
              value={filters.beds}
              onValueChange={(value: any) => handleChange("beds", value)}
            >
              <SelectTrigger id="beds" className="mt-1">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4">
          <Label>Price Range</Label>
          <div className="mt-6 px-2">
            <Slider
              defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
              max={100000000}
              step={1000000}
              onValueChange={handlePriceChange}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
        </div>

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
