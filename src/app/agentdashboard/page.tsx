"use client";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import Link from "next/link";
import PropertyTable from "../agentdashboard/PropertiesTable";
import ProductsTable from "./ProductsTable";
import CategoriesTable from "./CategoriesTable";
import CustomersTable from "./CustomersTable";
import OrdersTable from "./OrdersTable";
import BlogsTable from "./BlogsTable";

interface DecodedToken {
  _id: string;
  email: string;
  role: string;
  companyName?: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("products"); // Default tab is products
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="));
    if (!cookie) return;

    const token = cookie.split("=")[1];
    try {
      const decoded: DecodedToken = jwtDecode(token);
      setCompanyName(decoded.companyName || "Your Agency");
    } catch (err) {
      console.error("Token decode failed", err);
    }
  }, []);
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
        <h2 className="text-xl font-semibold mb-4">Welcome {companyName}</h2>
        <ul>
          <li>
            <button
              className={`w-full text-left p-2 ${
                activeTab === "properties" ? "bg-blue-600" : ""
              }`}
              onClick={() => setActiveTab("properties")}
            >
              Properties
            </button>
          </li>
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
        {activeTab === "properties" && <PropertyTable />}
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
