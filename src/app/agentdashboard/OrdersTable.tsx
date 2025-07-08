// src/app/admin/OrdersTable.tsx
import Table from "./components/Table";

const OrdersTable = () => {
  const columns = [
    { label: "Name", key: "name" },
    { label: "Phone", key: "phone" },
    { label: "Total Amount", key: "totalAmount" },
    { label: "Date", key: "date" },
    { label: "Status", key: "status" },
    { label: "Payment Status", key: "paymentStatus" },
  ];

  return (
    <Table
      title="Orders"
      apiEndpoint="/api/orders"
      itemType="order"
      columns={columns}
    />
  );
};

export default OrdersTable;
