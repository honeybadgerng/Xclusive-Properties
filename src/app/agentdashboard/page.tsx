"use client";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
// import Link from "next/link";
import PropertyTable from "../agentdashboard/PropertiesTable";

interface DecodedToken {
  _id: string;
  email: string;
  role: string;
  companyName?: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("properties"); // Default tab is products
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
              My Properties
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
      </div>
    </div>
  );
};

export default AdminDashboard;
