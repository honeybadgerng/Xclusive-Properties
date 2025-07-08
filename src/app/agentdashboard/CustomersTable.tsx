// src/app/admin/CustomersTable.tsx
import Table from "./components/Table";

const CustomersTable = () => {
  return (
    <Table title="Customers" apiEndpoint="/api/customers" itemType="customer" />
  );
};

export default CustomersTable;
