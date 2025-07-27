import mongoose from "mongoose";
const SubscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: String, required: true }, // e.g., "explorer"
  duration: {
    type: String,
    enum: ["monthly", "half-year", "yearly"],
    required: true,
  },
  pricePaid: Number,
  startDate: Date,
  endDate: Date,
  status: {
    type: String,
    enum: ["active", "expired", "cancelled"],
    default: "active",
  },
});

export default mongoose.models.Subscription ||
  mongoose.model("Subscription", SubscriptionSchema);
