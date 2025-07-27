"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import SubscribeButton from "./SubscribeButton";

interface Plan {
  _id: string;
  name: string;
  key: string;
  monthlyPrice: number;
  halfYearPrice: number;
  fullYearPrice: number;
  listings: number;
  premiumListings: number;
  boosts: number;
}

const PricingTable = () => {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    fetch("/api/plans")
      .then((res) => res.json())
      .then((data) => setPlans(data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Choose Your RJB Plan
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white"
          >
            <h3 className="text-xl font-semibold mb-2">{plan.name} Plan</h3>
            <p className="text-gray-600 mb-4">
              ₦{plan.monthlyPrice.toLocaleString()} / month
            </p>

            <ul className="text-sm mb-4 space-y-1">
              <li>📦 {plan.listings} Listings</li>
              <li>✨ {plan.premiumListings} Premium Listings</li>
              <li>🚀 {plan.boosts} Boosts</li>
            </ul>

            <div className="space-y-2">
              <SubscribeButton plan={plan} duration="monthly" />
              <SubscribeButton plan={plan} duration="half-year" />
              <SubscribeButton plan={plan} duration="yearly" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingTable;
