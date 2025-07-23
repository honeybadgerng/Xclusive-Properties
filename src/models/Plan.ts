import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., Explorer
  key: { type: String, required: true }, // slug: 'explorer'
  monthlyPrice: { type: Number, required: true },
  halfYearPrice: { type: Number, required: true },
  fullYearPrice: { type: Number, required: true },
  listings: Number,
  premium: Number,
  boosts: Number,
});

export default mongoose.models.Plan || mongoose.model("Plan", PlanSchema);
