import mongoose, { Schema, Document, model, models } from "mongoose";

// TypeScript Interface
export interface IProperty extends Document {
  title: string;
  marketStatus: "available" | "rented" | "sold";
  category: "for rent" | "for sale" | "joint venture" | "shortlet";
  type:
    | "flat/apartment"
    | "House"
    | "Land"
    | "commercial property"
    | "Event Center/ Venue";
  subtype?: string;
  city: string;
  street: string;
  price: number;
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
  videoUrl?: string;
  description: string;
  facilities: string[];
  images: string[];
  slug: string;
}

// Validate image array to ensure no more than 6 images
function imageLimit(val: string[]) {
  return val.length <= 6;
}

// Mongoose Schema
const PropertySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    featured: { type: Boolean, default: false },
    premium: { type: Boolean, default: false },
    marketStatus: {
      type: String,
      enum: ["available", "rented", "sold"],
      required: true,
    },
    category: {
      type: String,
      enum: ["for rent", "for sale", "joint venture", "shortlet"],
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
    subtype: { type: String }, // You can validate this dynamically at the controller level
    city: { type: String, required: true },
    street: { type: String, required: true },
    price: { type: Number, required: true },
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
    videoUrl: { type: String },
    description: { type: String, required: true },
    facilities: { type: [String], default: [] },
    images: {
      type: [String],
      validate: [imageLimit, "{PATH} exceeds the limit of 6"],
      required: true,
    },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default models.Property || model<IProperty>("Property", PropertySchema);
