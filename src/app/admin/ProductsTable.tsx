import React from "react";
import Table from "./components/Table";

const ProductsTable: React.FC = () => {
  // Define the columns for the products table
  const columns = [
    { key: "name", label: "Name" },
    { key: "price", label: "Price" },
    { key: "category", label: "Category" },
    { key: "stock", label: "Stock" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <Table
        title="Product"
        apiEndpoint="/api/products"
        itemType="product"
        columns={columns}
      />
    </div>
  );
};

export default ProductsTable;
