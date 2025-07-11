"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface TableColumn {
  key: string;
  label: string;
}

interface TableProps {
  title: string;
  apiEndpoint: string;
  itemType: string;
  columns?: TableColumn[];
}

const Table: React.FC<TableProps> = ({
  title,
  apiEndpoint,
  itemType,
  columns = [],
}) => {
  const [items, setItems] = useState<any[]>([]);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;

        const res = await fetch(apiEndpoint, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!res.ok) throw new Error("Failed to fetch items");

        const data = await res.json();
        setItems(data.data || data); // fallback if no `.data`
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchItems();
  }, [apiEndpoint]);

  if (!columns || columns.length === 0) {
    return <div>No columns defined</div>;
  }

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <Link
          href={`/agentdashboard/add-${itemType}`}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New {title}
        </Link>
      </div>

      <table className="w-full mt-6 border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="border border-gray-300 px-4 py-2">
                {col.label}
              </th>
            ))}
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              {columns.map((col) => (
                <td key={col.key} className="border border-gray-300 px-4 py-2">
                  {item[col.key] ?? "-"}
                </td>
              ))}
              <td className="border border-gray-300 px-4 py-2 flex gap-2">
                <Link
                  href={`/agentdashboard/edit-${itemType}/${item._id}`}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => setDeleteItemId(item._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Delete Confirmation Modal */}
      {deleteItemId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-4">
              Are you sure you want to delete this {itemType}?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteItemId(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("token");
                    const res = await fetch(`/api/properties/${deleteItemId}`, {
                      method: "DELETE",
                      headers: token
                        ? { Authorization: `Bearer ${token}` }
                        : {},
                    });

                    if (!res.ok) {
                      const err = await res.json();
                      alert("Failed to delete: " + err.message);
                    } else {
                      setItems((prev) =>
                        prev.filter((item) => item._id !== deleteItemId)
                      );
                      setDeleteItemId(null);
                    }
                  } catch (err) {
                    console.error("Delete error:", err);
                    alert("Something went wrong.");
                  }
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
