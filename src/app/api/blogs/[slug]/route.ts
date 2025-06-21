import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Blog from "@/models/Blog";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect(); // Connect to the database

    const { slug } = params;

    const blog = await Blog.findOne({ slug }).lean();

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
