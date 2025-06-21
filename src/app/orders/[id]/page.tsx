"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const OrderDetailsPage = () => {
  const { id } = useParams(); // Get the order ID from the URL
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders?id=${id}`); // Fetch the specific order
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.success) {
          setOrder(data.data); // Update the state with the fetched order
        } else {
          setError(data.message || "Failed to fetch order details");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching order details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrder();
  }, [id]);

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p>{error}</p>;

  if (!order) return <p>No order found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <p>
        <strong>Order ID:</strong> {order._id}
      </p>
      <p>
        <strong>Payment Status:</strong> {order.paymentStatus}
      </p>
      <p>
        <strong>Order Date:</strong>{" "}
        {new Date(order.createdAt).toLocaleString()}
      </p>

      <h2 className="text-xl font-semibold mt-6">Cart Items:</h2>
      <ul>
        {order.cart.map(
          (
            item: {
              productId: {
                name:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<React.AwaitedReactNode>
                  | null
                  | undefined;
                price:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<React.AwaitedReactNode>
                  | null
                  | undefined;
              };
              quantity:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<React.AwaitedReactNode>
                | null
                | undefined;
            },
            index: React.Key | null | undefined
          ) => (
            <li key={index}>
              <p>
                <strong>{item.productId.name}</strong>
              </p>
              <p>Price: {item.productId.price}</p>
              <p>Quantity: {item.quantity}</p>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default OrderDetailsPage;
