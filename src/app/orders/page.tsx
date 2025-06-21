"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const OrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders"); // Fetch from your working endpoint
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.success) {
          setOrders(data.data); // Update the state with the fetched orders
        } else {
          setError(data.message || "Failed to fetch orders");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order._id} className="border-b pb-4">
            <div>
              <p className="font-semibold">Order ID: {order._id}</p>
              <p>Status: {order.paymentStatus}</p>
              <Link href={`/orders/${order._id}`} className="text-blue-500">
                View Details
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
