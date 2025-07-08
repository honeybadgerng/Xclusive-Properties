"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});
import "react-quill/dist/quill.snow.css";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // Holds HTML content
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(""); // Optional cover image URL
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Generate slug automatically based on title
  useEffect(() => {
    const generateSlug = (title: string) => {
      return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-") // Replace spaces and non-alphanumeric characters with "-"
        .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
    };

    if (title) {
      setSlug(generateSlug(title));
    }
  }, [title]);

  // ReactQuill toolbar customization
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }], // Headers
      ["bold", "italic", "underline", "strike"], // Text styling
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      ["link", "image"], // Links and image
      ["clean"], // Remove formatting
    ],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, slug, image }),
      });

      if (res.ok) {
        alert("Blog added successfully!");
        router.push("/blogs");
      } else {
        const errorData = await res.json();
        alert(`Failed to add blog: ${errorData.error}`);
      }
    } catch (error) {
      alert("An error occurred while adding the blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Add New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Slug (Auto-generated)</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
            disabled // Slug is auto-generated but can be edited if needed
          />
        </div>
        <div>
          <label className="block mb-2">Content</label>
          <ReactQuill
            value={content}
            onChange={(value) => setContent(value)}
            modules={modules}
            className="bg-white"
          />
        </div>
        <div>
          <label className="block mb-2">Cover Image (Optional)</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="URL of the cover image"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className={`mt-4 px-4 py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Adding Blog..." : "Add Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
