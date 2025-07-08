// src/app/admin/CategoriesTable.tsx
import Table from "./components/Table";

const CategoriesTable = () => {
  return (
    <Table
      title="Categories"
      apiEndpoint="/api/categories"
      itemType="category"
    />
  );
};

export default CategoriesTable;
