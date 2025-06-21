import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/Product";

export async function GET() {
  await dbConnect();
  const products = await Product.find({});
  return NextResponse.json({ success: true, data: products });
}

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const product = await Product.create(body);
  return NextResponse.json({ success: true, data: product }, { status: 201 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await dbConnect();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
  const { id, ...body } = await request.json();
  await dbConnect();
  const updatedProduct = await Product.findByIdAndUpdate(id, body, {
    new: true,
  });
  return NextResponse.json({ success: true, data: updatedProduct });
}
