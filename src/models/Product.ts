import mongoose, { Schema, Document, model, models } from "mongoose";

// Define interface for Product document
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  images: string[]; // Array of up to 6 image URLs
  videoUrl?: string; // Optional video URL
  slug: string; // SEO-friendly URL
  category: string; // Product category
  subCategory?: string; // Optional subcategory field
  stock: number; // Inventory stock
  ratings: number; // Average rating
  reviews: {
    // Array of reviews
    user: string;
    comment: string;
    rating: number;
  }[];
  brand?: string; // Optional brand name
  tags: string[]; // Array of tags for filtering/search
}

// Create Product schema
const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: {
      type: [String],
      validate: [arrayLimit, "{PATH} exceeds the limit of 6"],
      required: true,
    }, // Max 6 images
    videoUrl: { type: String }, // Optional video URL
    slug: { type: String, required: true, unique: true }, // SEO slug, unique for each product
    category: { type: String, required: true },
    subCategory: { type: String }, // Optional subcategory
    stock: { type: Number, required: true, min: 0 }, // Stock, can't be negative
    ratings: { type: Number, default: 0 }, // Average rating
    reviews: [
      {
        user: { type: String, required: true },
        comment: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
      },
    ],
    brand: { type: String }, // Optional brand field
    tags: { type: [String] }, // Tags for filtering
  },
  { timestamps: true }
);

// Validate image array to ensure no more than 6 images
function arrayLimit(val: string[]) {
  return val.length <= 6;
}

export default models.Product || model<IProduct>("Product", ProductSchema);
