// /utils/handleSuccessfulPayment.ts
import dbConnect from "./dbConnect";
import User from "@/models/User";
import Plan from "@/models/Plan";
import Subscription from "@/models/Subscription";

type DurationType = "monthly" | "halfYear" | "fullYear";

const durationInMs: Record<DurationType, number> = {
  monthly: 30 * 24 * 60 * 60 * 1000,
  halfYear: 183 * 24 * 60 * 60 * 1000, // approx 6 months
  fullYear: 365 * 24 * 60 * 60 * 1000,
};

export default async function handleSuccessfulPayment({
  userId,
  plan,
  duration,
  pricePaid = 0,
}: {
  userId: string;
  plan: string;
  duration: DurationType;
  pricePaid?: number;
}) {
  await dbConnect();

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const selectedPlan = await Plan.findOne({ key: plan });
  if (!selectedPlan) throw new Error("Plan not found");

  const now = new Date();
  const expiresAt = new Date(now.getTime() + durationInMs[duration]);

  // Save subscription data into the user model
  user.subscription = {
    plan: selectedPlan.key,
    planName: selectedPlan.name,
    listings: selectedPlan.listings,
    premiumListings: selectedPlan.premiumListings,
    boosts: selectedPlan.boosts,
    duration,
    startedAt: now,
    expiresAt,
  };

  await user.save();

  // Optionally save to separate subscription history
  await Subscription.create({
    user: user._id,
    plan: selectedPlan.key,
    planName: selectedPlan.name,
    duration,
    pricePaid,
    startedAt: now,
    expiresAt,
    status: "active",
  });

  return { success: true };
}
