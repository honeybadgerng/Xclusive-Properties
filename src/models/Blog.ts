import mongoose from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  image?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  altTexts?: string[];
  faqs?: {
    question: string;
    answer: string;
  }[];
  excerpt?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // SEO-friendly URL
    content: { type: String, required: true },
    image: { type: String }, // Optional cover image URL
    // New SEO fields
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: { type: [String] },
    altTexts: { type: [String] },
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    excerpt: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
