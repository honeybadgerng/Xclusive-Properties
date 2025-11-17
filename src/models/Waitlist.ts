import mongoose, { Schema, Document, models } from "mongoose";

export interface IWaitlist extends Document {
  fullName: string;
  email: string;
  phoneNumber: string;
  investmentRange: string;
  investmentPreference: string;
  paymentPreference: string;
  wantsUpdates: boolean;
  createdAt: Date;
}

const WaitlistSchema = new Schema<IWaitlist>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    investmentRange: { type: String, required: true },
    investmentPreference: { type: String, required: true },
    paymentPreference: { type: String, required: true },
    wantsUpdates: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default models.Waitlist || mongoose.model("Waitlist", WaitlistSchema);
