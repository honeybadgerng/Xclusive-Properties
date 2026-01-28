"use client";

import React from "react";
import { ShieldCheck, Clock, Search, Coins, MapPin, Lock } from "lucide-react";

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <ShieldCheck className="h-10 w-10 text-secondary" />,
    title: "Blockchain Verified Properties",
    description:
      "Each listing includes on chain verification to confirm ownership, history, and authenticity.",
  },
  {
    icon: <Clock className="h-10 w-10 text-secondary" />,
    title: "Faster Deal Closure",
    description:
      "Smart workflows reduce paperwork and speed up buying, renting, and investment processes.",
  },
  {
    icon: <Search className="h-10 w-10 text-secondary" />,
    title: "Transparent Property Data",
    description:
      "Access pricing, ownership status, and property details with full visibility before commitment.",
  },
  {
    icon: <Coins className="h-10 w-10 text-secondary" />,
    title: "Crypto and Naira Payments",
    description:
      "Pay using supported cryptocurrencies or local currency with clear conversion and records.",
  },
  {
    icon: <MapPin className="h-10 w-10 text-secondary" />,
    title: "Verified Nigerian Locations",
    description:
      "Properties sourced from trusted developers in Lagos, Abuja, and other key cities.",
  },
  {
    icon: <Lock className="h-10 w-10 text-secondary" />,
    title: "Escrow Protected Transactions",
    description:
      "Funds remain secured until transaction conditions are met and ownership updates recorded.",
  },
];

const FeaturedSection: React.FC = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Xclusive Properties Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A real estate platform built for trust, speed, and digital ownership
            in Nigeria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-primary/5 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
