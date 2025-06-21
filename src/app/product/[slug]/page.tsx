import React from "react";
import { Metadata } from "next";
import dbConnect from "@/utils/dbConnect";
import Product, { IProduct } from "@/models/Product";
import ProductDetailsClient from "@/components/ProductDetailsClient"; // Client Component

// Fetch product data from the database
async function fetchProduct(slug: string): Promise<IProduct> {
  await dbConnect();
  const product = await Product.findOne({ slug }).lean();
  if (!product) throw new Error(`Product with slug "${slug}" not found`);
  return JSON.parse(JSON.stringify(product));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await fetchProduct(params.slug);
  // Define the Open Graph image URL
  const ogImageUrl = product.images?.[0] || "";
  return {
    title: `${product.name} | Xstore`,
    description: product.description,
    keywords: product.tags.join(", "),
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
      url: `https://xstore-three.vercel.app/products/${product.slug}`, // Replace with your base URL
      images: [
        {
          url: ogImageUrl,
          width: 1200, // Recommended dimensions for OG images
          height: 630,
          alt: product.name,
        },
      ],
    },
  };
}

// Product Details Component
export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const product = await fetchProduct(params.slug);

  return (
    <div>
      <ProductDetailsClient product={product} />
    </div>
  );
}
