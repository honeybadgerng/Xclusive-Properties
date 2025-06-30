"use client";

import { useRouter } from "next/navigation";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import FeaturedProperties from "../components/FeaturedProperties.server";
import FeatureSection from "@/components/FeatureSection";
// import TestimonialSection from "@/components/TestimonialSection";
import CallToAction from "@/components/CallToAction";
import PropertySearch from "@/components/PropertySearch";

export default function HomePage() {
  const router = useRouter();

  const handleSearch = (filters: any) => {
    const params = new URLSearchParams();

    if (filters.location) params.append("location", filters.location);
    if (filters.type) params.append("type", filters.type);
    if (filters.purpose) params.append("purpose", filters.purpose);
    if (filters.beds) params.append("beds", filters.beds);
    if (filters.priceRange) {
      params.append("minPrice", filters.priceRange[0]);
      params.append("maxPrice", filters.priceRange[1]);
    }

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div>
      <HeroSection />

      {/* Property Search just below Hero */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <PropertySearch onSearch={handleSearch} />
      </div>

      <FeaturedProperties />
      <FeatureSection />
      {/* <TestimonialSection /> */}
      <CallToAction />
      <Footer />
    </div>
  );
}
