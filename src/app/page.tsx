import HeroSection from "../components/HeroSection"; // Import the HeroSection component
import Footer from "../components/Footer";
import FeaturedProperties from "../components/FeaturedProperties.server"; // Import the FeaturedProperties component
import FeatureSection from "@/components/FeatureSection";
import TestimonialSection from "@/components/TestimonialSection";
import CallToAction from "@/components/CallToAction";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      <FeaturedProperties />
      <FeatureSection />
      <TestimonialSection />
      <CallToAction />
      <Footer />
    </div>
  );
}
