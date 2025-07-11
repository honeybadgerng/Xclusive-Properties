// app/properties/[slug]/page.tsx
import { Metadata } from "next";
import PropertyContent from "./PropertyContent";

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
    whatsapp?: string;
    company?: string; // optional for agents
  };
}

// Fetch SEO metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties?slug=${params.slug}`,
    { cache: "no-store" }
  );
  const property = await res.json();
  const ogImageUrl = property?.images?.[0] || "/default-og.jpg";

  return {
    title: `${property.title} | Xclusive Properties`,
    description: property.description.slice(0, 160),
    keywords: [
      property.title,
      property.city,
      property.state,
      "real estate",
      "property in Nigeria",
      "houses for sale",
    ],
    openGraph: {
      title: `${property.title} | Xclusive Properties`,
      description: property.description,
      url: `https://xclusive-properties.vercel.app/properties/${property.slug}`,
      type: "article",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${property.title} | Xclusive Properties`,
      description: property.description,
      images: [ogImageUrl],
    },
  };
}

// Render page with server-side data
export default async function PropertyPage({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties?slug=${params.slug}`,
    { cache: "no-store" }
  );
  const property: Property = await res.json();

  return <PropertyContent property={property} />;
}
