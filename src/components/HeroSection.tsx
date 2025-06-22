import React from "react";
import { Button } from "@/components/ui/button";
import { Building, MapPin, Search } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            Find Your Perfect <span className="text-secondary">Home</span> in
            Nigeria
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-10 animate-slide-in">
            Exclusive properties for sale, rent and short-lets across Nigeria's
            prime locations.
          </p>

          <div
            className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <Button className="bg-secondary hover:bg-secondary/90 text-primary font-medium py-6">
              <Building className="mr-2 h-5 w-5" />
              Browse Properties
            </Button>
            <Button
              variant="outline"
              className="border-white hover:bg-white/10 py-6"
            >
              <MapPin className="mr-2 h-5 w-5" />
              View Locations
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center">
            <div
              className="bg-white text-primary shadow-lg rounded-full py-2 px-4 flex items-center animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <Search className="h-5 w-5 text-secondary mr-2" />
              <span className="text-sm font-medium">Quick search: </span>
              <div className="ml-2 space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full hover:bg-secondary/20 hover:text-secondary"
                >
                  Lagos
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full hover:bg-secondary/20 hover:text-secondary"
                >
                  Abuja
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full hover:bg-secondary/20 hover:text-secondary"
                >
                  Port Harcourt
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
