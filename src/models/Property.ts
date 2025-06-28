import mongoose, { Schema, Document, model, models } from "mongoose";

// TypeScript Interface
export interface IProperty extends Document {
  title: string;
  slug: string;
  marketStatus: "available" | "rented" | "sold";
  category: "for rent" | "for sale" | "joint venture" | "short-let";
  type:
    | "flat/apartment"
    | "House"
    | "Land"
    | "commercial property"
    | "Event Center/ Venue";
  subtype?: string;
  city: string;
  state: string;
  street: string;
  price: number;
  usdtPrice: number; // ✅ newly added
  paymentFrequency:
    | "per annum"
    | "per month"
    | "per week"
    | "per day"
    | "per hour"
    | "one time payment";
  bedrooms?: number;
  toilets?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  totalArea?: number;
  coveredArea?: number;
  furnished: boolean;
  serviced: boolean;
  featured: boolean;
  premium: boolean;
  videoUrl?: string;
  description: string;
  facilities: string[];
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Validate image array to ensure no more than 6 images
function imageLimit(val: string[]) {
  return val.length <= 6;
}

// Mongoose Schema
const PropertySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    marketStatus: {
      type: String,
      enum: ["available", "rented", "sold"],
      required: true,
    },
    category: {
      type: String,
      enum: ["for rent", "for sale", "joint venture", "short-let"],
      required: true,
    },
    type: {
      type: String,
      enum: [
        "flat/apartment",
        "House",
        "Land",
        "commercial property",
        "Event Center/ Venue",
      ],
      required: true,
    },
    subtype: { type: String }, // validated on frontend/controller
    city: { type: String, required: true },
    state: { type: String, required: true }, // ✅ newly added
    street: { type: String, required: true },
    price: { type: Number, required: true },
    usdtPrice: { type: Number, required: true }, // ✅ newly added
    paymentFrequency: {
      type: String,
      enum: [
        "per annum",
        "per month",
        "per week",
        "per day",
        "per hour",
        "one time payment",
      ],
      required: true,
    },
    bedrooms: { type: Number },
    toilets: { type: Number },
    bathrooms: { type: Number },
    parkingSpaces: { type: Number },
    totalArea: { type: Number },
    coveredArea: { type: Number },
    furnished: { type: Boolean, default: false },
    serviced: { type: Boolean, default: false },
    featured: { type: Boolean, default: false }, // ✅ to match form
    premium: { type: Boolean, default: false }, // ✅ to match form
    videoUrl: { type: String },
    description: { type: String, required: true },
    facilities: { type: [String], default: [] },
    images: {
      type: [String],
      validate: [imageLimit, "{PATH} exceeds the limit of 6"],
      required: true,
    },
  },
  { timestamps: true }
);

export default models.Property || model<IProperty>("Property", PropertySchema);
