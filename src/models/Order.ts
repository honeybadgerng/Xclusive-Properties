import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: { type: String, required: true }, // Store product name directly
      price: { type: Number, required: true }, // Store product price directly
      quantity: { type: Number, required: true },
    },
  ],
  formData: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
  },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["success", "failed"], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = models.Order || model("Order", OrderSchema);
export default Order;
