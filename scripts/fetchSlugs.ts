// scripts/fetchSlugs.ts
import mongoose from "mongoose";
import Product from "../src/models/Product";
import Blog from "../src/models/Blog";

const connect = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI!);
  }
};

export const fetchSlugs = async () => {
  await connect();

  const products = await Product.find({}, "slug").lean();
  const blogs = await Blog.find({}, "slug").lean();

  return {
    productUrls: products.map((p) => ({
      loc: `/products/${p.slug}`,
      changefreq: "weekly",
      priority: 0.8,
    })),
    blogUrls: blogs.map((b) => ({
      loc: `/blogs/${b.slug}`,
      changefreq: "weekly",
      priority: 0.7,
    })),
  };
};
