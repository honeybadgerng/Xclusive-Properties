import React, { useEffect, useState } from "react";
import { format } from "date-fns";

const BlogTable = () => {
  interface Blog {
    _id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
  }

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState("");

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleAdd = () => {
    console.log("Redirect to Add New Blog form");
    // Implement navigation or modal logic to add a new blog
  };

  const handleEdit = (id: string) => {
    console.log(`Edit blog with ID: ${id}`);
    // Implement navigation or logic to edit the blog
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        const response = await fetch(`/api/blogs/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`Error deleting blog: ${response.status}`);
        }
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error("An unknown error occurred");
        }
      }
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Blog Management</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add New Blog
        </button>
      </div>
      {error && <p className="text-red-500">Error: {error}</p>}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Published Date</th>
            <th className="border border-gray-300 px-4 py-2">Last Updated</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <tr key={blog._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {blog.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {format(new Date(blog.createdAt), "yyyy-MM-dd HH:mm:ss")}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {format(new Date(blog.updatedAt), "yyyy-MM-dd HH:mm:ss")}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEdit(blog._id)}
                    className="mr-2 text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="border border-gray-300 px-4 py-2 text-center"
              >
                No blogs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlogTable;
