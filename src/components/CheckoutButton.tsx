"use client";

import React, { useState } from "react";
import { usePaystackPayment } from "react-paystack";

interface CheckoutButtonProps {
  formData: {
    name: string;
    address: string;
    email: string;
  };
  amount: number;
  cart: any[];
  onSuccess: () => void;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  formData,
  amount,
  cart,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  if (typeof window === "undefined") {
    return null;
  }

  const config = {
    reference: new Date().getTime().toString(),
    name: formData.name,
    email: formData.email,
    address: formData.address,
    amount,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  };

  const initializePayment = usePaystackPayment(config);

  const handlePayment = async () => {
    setLoading(true);
    initializePayment({
      onSuccess: async (paymentData) => {
        alert("Payment Successful!");
        console.log("Payment Data:", paymentData);

        const orderData = {
          cart: cart.map((item) => ({
            productId: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          formData: {
            name: formData.name,
            address: formData.address,
            email: formData.email,
          },
          amount,
          paymentStatus: "success",
        };
        console.log("Order Data:", orderData);

        try {
          const response = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
          });

          const result = await response.json();
          console.log("Order API Response:", result);

          if (result.success) {
            console.log("Order created successfully:", result.order);
            onSuccess();
          } else {
            console.error("Failed to create order:", result.message);
            alert(result.message || "Order creation failed.");
          }
        } catch (error) {
          console.error("Error creating order:", error);
          alert("An error occurred while creating your order.");
        }

        setLoading(false);
      },
      onClose: () => {
        alert("Payment Cancelled!");
        setLoading(false);
      },
    });
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-green-500 text-white px-4 py-2 rounded"
      disabled={loading}
    >
      {loading ? "Processing..." : "Proceed to Pay"}
    </button>
  );
};

export default CheckoutButton;
