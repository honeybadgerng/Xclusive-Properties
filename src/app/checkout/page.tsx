"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import dynamic from "next/dynamic";

// Dynamically import CheckoutButton, ensuring it only runs on the client side
const CheckoutButton = dynamic(() => import("@/components/CheckoutButton"), {
  ssr: false, // This disables server-side rendering for CheckoutButton
});

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSuccess = () => {
    clearCart();
    alert("Payment successful! Your order has been placed.");
  };

  // Only render the content when the page is client-side
  if (!isClient) {
    return null; // You can also render a loading spinner or fallback UI
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <form className="space-y-4 mb-6">
        <div>
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="address" className="block font-medium">
            Address
          </label>
          <textarea
            id="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          ></textarea>
        </div>
        <div>
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </form>
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <ul className="space-y-2 mb-6">
        {cart.map((item) => (
          <li key={item._id} className="flex justify-between items-center">
            <span>{item.name}</span>
            <span>
              ₦{item.price} x {item.quantity}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-bold">
          Total: ₦{totalAmount.toLocaleString()}
        </span>
      </div>
      <CheckoutButton
        formData={formData} // Pass the entire formData object
        amount={totalAmount * 100}
        cart={cart} // Include cart items
        onSuccess={handleSuccess}
      />
    </div>
  );
}
