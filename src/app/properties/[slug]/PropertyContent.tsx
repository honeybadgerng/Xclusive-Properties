// app/properties/[slug]/PropertyContent.tsx
"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";
import {
  Bed,
  Bath,
  MaximizeIcon,
  Calendar,
  MapPin,
  Phone,
  Heart,
  Share,
  Check,
  ChevronLeft,
  ChevronRight,
  Info,
  Mail,
} from "lucide-react";

interface Property {
  _id: string;
  title: string;
  slug: string;
  description: string;
  location?: string;
  state: string;
  city: string;
  street: string;
  price: number;
  usdtPrice: number;
  bedrooms?: number;
  bathrooms?: number;
  totalArea?: number;
  videoUrl?: string;
  facilities: string[];
  images: string[];
  agent?: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
}

export default function PropertyContent({ property }: { property: Property }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const formatPrice = (price: number) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <Layout>
      {/* Image Carousel */}
      <div className="relative">
        <div className="aspect-[16/9] w-full bg-muted overflow-hidden">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
          onClick={prevImage}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
          onClick={nextImage}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Thumbnails */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {property.images.map((image, index) => (
            <button
              key={index}
              className={`w-12 h-8 border-2 ${
                index === currentImageIndex
                  ? "border-secondary"
                  : "border-white/50"
              } overflow-hidden rounded transition-all`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <img src={image} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl md:text-3xl font-bold">
                {property.title}
              </h1>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{`${property.street}, ${property.city}, ${property.state}`}</span>
            </div>

            <div className="bg-card p-4 rounded-lg border border-border mb-6">
              <div className="text-2xl font-bold">
                ₦{formatPrice(property.price)}
              </div>
              <div className="text-sm text-muted-foreground">
                ≈ ${formatPrice(property.usdtPrice)} USDT
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-4 mb-6">
              {property.bedrooms !== undefined && (
                <div className="flex items-center bg-muted px-4 py-2 rounded-md">
                  <Bed className="h-5 w-5 mr-2 text-primary" />
                  <span>
                    <span className="font-semibold">{property.bedrooms}</span>{" "}
                    Bedrooms
                  </span>
                </div>
              )}
              {property.bathrooms !== undefined && (
                <div className="flex items-center bg-muted px-4 py-2 rounded-md">
                  <Bath className="h-5 w-5 mr-2 text-primary" />
                  <span>
                    <span className="font-semibold">{property.bathrooms}</span>{" "}
                    Bathrooms
                  </span>
                </div>
              )}
              {property.totalArea !== undefined && (
                <div className="flex items-center bg-muted px-4 py-2 rounded-md">
                  <MaximizeIcon className="h-5 w-5 mr-2 text-primary" />
                  <span>
                    <span className="font-semibold">
                      {property.totalArea || 0}
                    </span>{" "}
                    m²
                  </span>
                </div>
              )}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="mb-6">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Facilities</TabsTrigger>
                <TabsTrigger value="video">Video Tour</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <h2 className="text-xl font-semibold">Property Description</h2>
                <div className="text-muted-foreground space-y-2">
                  <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line text-justify">
                    <ReactMarkdown>{property.description}</ReactMarkdown>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features">
                <h2 className="text-xl font-semibold mb-4">Facilities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3">
                  {property.facilities.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-secondary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="video">
                <h2 className="text-xl font-semibold mb-4">Video Tour</h2>
                {property.videoUrl ? (
                  <div className="aspect-video overflow-hidden rounded-md bg-muted">
                    <video
                      controls
                      className="w-full h-full object-cover"
                      poster={property.images[0]}
                    >
                      <source src={property.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No video yet</p>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-2">Book an Inspection</h3>
              <Button className="w-full mb-3">
                <Calendar className="mr-2 h-4 w-4" />
                Book Now
              </Button>
              <div className="text-center mt-4 text-sm text-muted-foreground">
                <Info className="h-4 w-4 inline mr-1" />
                No payment required
              </div>
            </div>

            {property.agent && (
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={property.agent.image}
                    alt={property.agent.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{property.agent.name}</h3>
                    <p className="text-sm text-muted-foreground">Agent</p>
                  </div>
                </div>
                <Button className="w-full bg-secondary text-primary mb-2">
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
