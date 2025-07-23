import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Plan from "@/models/Plan";

export async function GET() {
  await dbConnect();

  // Optional: clear previous data (only use if you want to reset plans)
  await Plan.deleteMany();

  const rjbPlans = [
    {
      key: "free",
      name: "Free",
      monthlyPrice: 0,
      halfYearPrice: 0,
      fullYearPrice: 0,
      features: ["5 Listings", "0 Premium", "0 Boost", "1"],
      listings: 5,
      premiumListings: 0,
      boosts: 0,
    },
    {
      key: "explorer",
      name: "Explorer",
      monthlyPrice: 5000,
      halfYearPrice: 28500,
      fullYearPrice: 54000,
      features: [
        "25 Listings",
        "5 Premium",
        "5 Boost",
        "View Unlimited Requests",
      ],
      listings: 25,
      premiumListings: 5,
      boosts: 5,
    },

    {
      key: "starter",
      name: "Starter",
      monthlyPrice: 10000,
      halfYearPrice: 57000,
      fullYearPrice: 108000,
      features: ["100 Listings", "20 Premium", "10 Boosts"],
      listings: 100,
      premiumListings: 20,
      boosts: 10,
    },

    {
      key: "growth",
      name: "Growth",
      monthlyPrice: 15000,
      halfYearPrice: 85500,
      fullYearPrice: 162000,
      features: ["200 Listings", "40 Premium", "20 Boosts"],
      listings: 200,
      premiumListings: 40,
      boosts: 20,
    },
    {
      key: "accelerate",
      name: "Accelerate",
      monthlyPrice: 20000,
      halfYearPrice: 114000,
      fullYearPrice: 216000,
      features: ["300 Listings", "60 Premium", "30 Boosts"],
      listings: 300,
      premiumListings: 60,
      boosts: 30,
    },
    {
      key: "momentum",
      name: "Momentum",
      monthlyPrice: 25000,
      halfYearPrice: 142500,
      fullYearPrice: 270000,
      features: ["400 Listings", "80 Premium", "40 Boosts"],
      listings: 400,
      premiumListings: 80,
      boosts: 40,
    },
    {
      key: "pro",
      name: "Pro",
      monthlyPrice: 30000,
      halfYearPrice: 171000,
      fullYearPrice: 324000,
      features: ["500 Listings", "100 Premium", "50 Boosts"],
      listings: 500,
      premiumListings: 100,
      boosts: 50,
    },
    {
      key: "elite",
      name: "Elite",
      monthlyPrice: 35000,
      halfYearPrice: 199500,
      fullYearPrice: 378000,
      features: ["600 Listings", "120 Premium", "60 Boosts"],
      listings: 600,
      premiumListings: 120,
      boosts: 60,
    },
    {
      key: "premier",
      name: "Premier",
      monthlyPrice: 40000,
      halfYearPrice: 228000,
      fullYearPrice: 432000,
      features: ["700 Listings", "140 Premium", "70 Boosts"],
      listings: 700,
      premiumListings: 140,
      boosts: 70,
    },
    {
      key: "titan",
      name: "Titan",
      monthlyPrice: 45000,
      halfYearPrice: 256500,
      fullYearPrice: 486000,
      features: ["800 Listings", "160 Premium", "80 Boosts"],
      listings: 800,
      premiumListings: 160,
      boosts: 80,
    },
    {
      key: "empire",
      name: "Empire",
      monthlyPrice: 50000,
      halfYearPrice: 285000,
      fullYearPrice: 540000,
      features: ["900 Listings", "180 Premium", "90 Boosts"],
      listings: 900,
      premiumListings: 180,
      boosts: 90,
    },
    {
      key: "infinity",
      name: "Infinity",
      monthlyPrice: 55000,
      halfYearPrice: 313500,
      fullYearPrice: 594000,
      features: ["Unlimited Listings", "Unlimited Premium", "Unlimited Boosts"],
      listings: Infinity,
      premiumListings: Infinity,
      boosts: Infinity,
    },
  ];

  await Plan.insertMany(rjbPlans);

  return NextResponse.json({ message: "RJB Plans seeded successfully" });
}
