// /app/subscription/success/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const SubscriptionSuccess = () => {
  const [status, setStatus] = useState("Verifying...");
  const searchParams = useSearchParams();
  const reference = searchParams?.get("reference");

  useEffect(() => {
    if (reference) {
      fetch(`/api/verify?reference=${reference}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setStatus(`❌ Failed: ${data.error}`);
          } else {
            setStatus("✅ Subscription activated!");
          }
        })
        .catch(() => setStatus("❌ Error verifying payment."));
    }
  }, [reference]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Payment Status</h1>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
