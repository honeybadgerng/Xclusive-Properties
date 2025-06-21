import dbConnect from "@/utils/dbConnect";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect(); // Connect to the database
    console.log("Connected to database");

    const body = await req.json(); // Parse the request body
    const { title, content, slug, image } = body;
    console.log("Received data:", { title, content, slug, image });

    // Basic validation
    if (!title || !content || !slug) {
      console.log("Validation failed: Title, content, and slug are required.");
      return new Response(
        JSON.stringify({ error: "Title, content, and slug are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create the new blog
    const newBlog = new Blog({
      title,
      content,
      slug,
      image, // Image is optional
    });

    await newBlog.save();
    console.log("Blog saved:", newBlog);

    return new Response(JSON.stringify(newBlog), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to create blog",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect(); // Connect to the database

    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    if (slug) {
      // Fetch a single blog by slug
      const blog = await Blog.findOne({ slug }).lean();

      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }

      return NextResponse.json(blog, { status: 200 });
    }

    // Fetch all blogs if no slug is provided
    const blogs = await Blog.find({}).lean();

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
