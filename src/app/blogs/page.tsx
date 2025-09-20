"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Grid,
  Pagination,
} from "@mui/material";
import Link from "next/link";

type Blog = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  image?: string; // Assuming each blog has an optional image field
  createdAt: string; // Assuming the blog has a createdAt field
};

const BlogsList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const blogsPerPage = 10; // Number of blogs per page

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();

        // Sort blogs in descending order of creation date
        const sortedBlogs = data.sort(
          (a: Blog, b: Blog) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setBlogs(sortedBlogs);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchBlogs();
  }, []);

  // Calculate the blogs to display based on pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 6, p: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Blogs
      </Typography>
      {blogs.length > 0 ? (
        <>
          <Grid container spacing={4}>
            {currentBlogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog._id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Wrap image in a Link */}
                  <Link href={`/blogs/${blog.slug}`} passHref>
                    <CardMedia
                      component="img"
                      sx={{
                        height: 200, // Uniform height
                        objectFit: "cover", // Crop to fit within the dimensions
                        cursor: "pointer", // Indicate it's clickable
                      }}
                      image={blog.image || "https://via.placeholder.com/300"} // Fallback to placeholder if no image is available
                      alt="Blog image"
                    />
                  </Link>
                  <CardContent>
                    {/* Wrap title in a Link */}
                    <Link href={`/blogs/${blog.slug}`} passHref>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                          cursor: "pointer",
                          textDecoration: "none", // Remove default link underline
                          "&:hover": { textDecoration: "underline" },
                          color: "inherit", // Match current text color
                        }}
                      >
                        {blog.title}
                      </Typography>
                    </Link>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {/* Extracting plain text from HTML content */}
                      {blog.content.replace(/<[^>]+>/g, "").slice(0, 100)}...
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      href={`/blogs/${blog.slug}`}
                      size="small"
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={Math.ceil(blogs.length / blogsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      ) : (
        <Typography>Loading please wait.</Typography>
      )}
    </Box>
  );
};

export default BlogsList;
