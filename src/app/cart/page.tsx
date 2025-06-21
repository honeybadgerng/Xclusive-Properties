"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="mb-4 space-y-4">
            {cart.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-500">
                    ₦{item.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="ml-4 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h2 className="text-lg font-semibold mb-4">
            Total: ₦{totalAmount.toLocaleString()}
          </h2>
          <button
            onClick={() => router.push("/checkout")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
