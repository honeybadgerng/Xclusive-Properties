import { Metadata } from "next";
import dbConnect from "@/utils/dbConnect";
import Blog from "@/models/Blog"; // Assuming you have a Blog model
import SingleBlogClient from "@/components/SingleBlogClient"; // Client Component
import Footer from "@/components/Footer";

// Fetch blog data from the database
async function fetchBlog(slug: string) {
  await dbConnect();
  const blog = await Blog.findOne({ slug }).lean();
  if (!blog) throw new Error(`Blog with slug "${slug}" not found`);
  return JSON.parse(JSON.stringify(blog));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blog = await fetchBlog(params.slug);

  const ogImageUrl = blog.image
    ? blog.image.startsWith("http")
      ? blog.image
      : `https://xstore-three.vercel.app/${blog.image}` // Fixed the position of the cursor
    : "";

  return {
    title: `${blog.title} | Xstore Blog`,
    description: blog.content.slice(0, 150).replace(/<[^>]*>?/gm, ""), // Strip HTML tags for description
    openGraph: {
      title: blog.title,
      description: blog.content.slice(0, 150).replace(/<[^>]*>?/gm, ""),
      type: "article",
      url: `https://xstore-three.vercel.app/blogs/${params.slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
  };
}

// Blog Details Component
export default async function BlogDetails({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await fetchBlog(params.slug);

  return (
    <div>
      <SingleBlogClient blog={blog} />
      <Footer />
    </div>
  );
}
