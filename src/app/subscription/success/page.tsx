// /app/subscription/success/page.tsx

"use client";

import React, { Suspense } from "react";
import SubscriptionSuccessContent from "./SubscriptionSuccessContent";

const SubscriptionSuccess = () => {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <SubscriptionSuccessContent />
    </Suspense>
  );
};

export default SubscriptionSuccess;
