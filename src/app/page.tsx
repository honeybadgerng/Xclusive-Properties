import HeroSection from "../components/HeroSection"; // Import the HeroSection component
import Footer from "../components/Footer";
import FeaturedProperties from "../components/FeaturedProperties.server"; // Import the FeaturedProperties component
import FeatureSection from "@/components/FeatureSection";
import TestimonialSection from "@/components/TestimonialSection";
import CallToAction from "@/components/CallToAction";
import PropertySearch from "@/components/PropertySearch";
// const handleSearch = (filters: any) => {
//   console.log("Search filters:", filters);
//   // In a real app, we would use these filters to fetch properties from an API
// };

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      {/* <div className="container mx-auto px-4 -mt-8 relative z-20">
        <PropertySearch onSearch={handleSearch} />
      </div> */}
      <FeaturedProperties />
      <FeatureSection />
      <TestimonialSection />
      <CallToAction />
      <Footer />
    </div>
  );
}
