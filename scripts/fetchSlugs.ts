// scripts/fetchSlugs.ts
import mongoose from "mongoose";

import Property from "@/models/Property";
const connect = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI!);
  }
};

export const fetchSlugs = async () => {
  await connect();

  const properties = await Property.find({}, "slug").lean();
  return {
    propertyUrls: properties.map((p) => ({
      loc: `/properties/${p.slug}`,
      changefreq: "weekly",
      priority: 0.7,
    })),
  };
};
