"use client";

import { useState } from "react";
import Link from "next/link";
import ProductsTable from "./ProductsTable";
import CategoriesTable from "./CategoriesTable";
import CustomersTable from "./CustomersTable";
import OrdersTable from "./OrdersTable";
import BlogsTable from "./BlogsTable";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("products"); // Default tab is products

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
        <ul>
          <li>
            <button
              className={`w-full text-left p-2 ${
                activeTab === "products" ? "bg-blue-600" : ""
              }`}
              onClick={() => setActiveTab("products")}
            >
              Products
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 ${
                activeTab === "categories" ? "bg-blue-600" : ""
              }`}
              onClick={() => setActiveTab("categories")}
            >
              Categories
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 ${
                activeTab === "orders" ? "bg-blue-600" : ""
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 ${
                activeTab === "customers" ? "bg-blue-600" : ""
              }`}
              onClick={() => setActiveTab("customers")}
            >
              Customers
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 ${
                activeTab === "blogs" ? "bg-blue-600" : ""
              }`}
              onClick={() => setActiveTab("blogs")}
            >
              Blogs
            </button>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h1>

        {/* Dynamically Render Content based on Active Tab */}
        {activeTab === "products" && <ProductsTable />}
        {activeTab === "categories" && <CategoriesTable />}
        {activeTab === "orders" && <OrdersTable />}
        {activeTab === "customers" && <CustomersTable />}
        {activeTab === "blogs" && <BlogsTable />}
      </div>
    </div>
  );
};

export default AdminDashboard;
