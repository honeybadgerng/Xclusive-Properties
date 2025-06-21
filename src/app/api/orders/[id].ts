// /pages/api/orders/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import Order from "@/models/Order";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      await dbConnect();
      const order = await Order.findById(id);
      if (order) {
        return res.status(200).json({ success: true, order });
      }
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Error fetching order" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
