import React from "react";
import { Button } from "@/components/ui/button";
import { Building, MapPin, Search, ShieldCheck, Coins } from "lucide-react";

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
          {/* Badge */}
          <div className="flex justify-center mb-6 animate-fade-in">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1 text-sm">
              <ShieldCheck className="h-4 w-4 text-secondary" />
              Blockchain Verified Listings
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            Own Property in Nigeria.
            <span className="text-secondary"> Backed by Crypto</span>
          </h1>

          <p className="text-lg md:text-xl opacity-90 mb-10 animate-slide-in">
            Buy, rent, or invest in verified Nigerian properties with blockchain
            records and secure digital payments.
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
              className="border-white text-white bg-transparent hover:bg-white/10 py-6"
            >
              <MapPin className="mr-2 h-5 w-5 text-white" />
              View Locations
            </Button>
            <Button
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/10 py-6"
            >
              <Coins className="mr-2 h-5 w-5 text-secondary" />
              Invest with Crypto
            </Button>
          </div>
          {/* Trust signals */}
          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm opacity-90 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-secondary" />
              On chain ownership records
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-secondary" />
              Escrow backed transactions
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-secondary" />
              Verified Nigerian developers
            </div>
          </div>

          {/* Quick search */}
          <div className="mt-12 flex items-center justify-center">
            <div className="bg-white text-primary shadow-lg rounded-full py-2 px-4 flex items-center">
              <Search className="h-5 w-5 text-secondary mr-2" />
              <span className="text-sm font-medium">Popular searches</span>

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
