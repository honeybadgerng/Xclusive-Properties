"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext"; // your auth context

interface Props {
  plan: {
    key: string;
    name: string;
    monthlyPrice: number;
    halfYearPrice: number;
    fullYearPrice: number;
  };
  duration: "monthly" | "half-year" | "yearly";
}

const SubscribeButton: React.FC<Props> = ({ plan, duration }) => {
  const { user } = useAuth(); // assumes { user: { email, _id } }
  console.log("USER FROM CONTEXT:", user);
  console.log("USER ID:", user?._id);
  const getLabel = () => {
    switch (duration) {
      case "monthly":
        return `₦${plan.monthlyPrice.toLocaleString()} / mo`;
      case "half-year":
        return `₦${plan.halfYearPrice.toLocaleString()} / 6mo`;
      case "yearly":
        return `₦${plan.fullYearPrice.toLocaleString()} / yr`;
    }
  };

  const handleSubscribe = async () => {
    if (!user) return alert("You must be logged in to subscribe.");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        planKey: plan.key,
        duration,
        userEmail: user.email,
        userId: user._id,
      }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Failed to initiate payment");
    }
  };

  return (
    <Button
      onClick={handleSubscribe}
      className="w-full bg-primary text-white hover:bg-primary/90"
    >
      {getLabel()}
    </Button>
  );
};

export default SubscribeButton;
