import React from "react";
import Table from "./components/Table";

const PropertiesTable: React.FC = () => {
  // Define the columns for the properties table
  const columns = [
    { key: "title", label: "Title" },
    { key: "price", label: "Price" },
    { key: "category", label: "Category" },
    { key: "marketStatus", label: "Market Status" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Properties</h1>
      <Table
        title="Properties"
        apiEndpoint="/api/properties"
        itemType="property"
        columns={columns}
      />
    </div>
  );
};

export default PropertiesTable;
