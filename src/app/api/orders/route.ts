import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect"; // Utility to connect to MongoDB
import Order from "@/models/Order"; // Import the Order model

// Utility function for error handling
function handleError(error: any, message: string) {
  console.error(`${message}:`, error);
  return NextResponse.json(
    { success: false, message: message },
    { status: 500 }
  );
}

// Get all orders or a single order by ID
export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      // Fetch a single order by ID
      const order = await Order.findById(id).populate(
        "cart.productId",
        "name price"
      );

      if (!order) {
        return NextResponse.json(
          { success: false, message: "Order not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, data: order }, { status: 200 });
    }

    // Fetch all orders
    const orders = await Order.find({})
      .populate("cart.productId", "name price")
      .exec();

    return NextResponse.json({ success: true, data: orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Create a new order
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    console.log("Request body:", body);

    // Ensure `name` and `price` are included in the `cart` items
    const order = await Order.create(body);

    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/orders:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Delete an order by ID
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    // Validate the ID
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Order ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    return handleError(error, "Error deleting order");
  }
}

// Update an order by ID (e.g., updating payment status)
export async function PUT(request: Request) {
  try {
    const { id, ...body } = await request.json();

    // Validate the ID
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Order ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();
    const updatedOrder = await Order.findByIdAndUpdate(id, body, { new: true });

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedOrder });
  } catch (error) {
    return handleError(error, "Error updating order");
  }
}
