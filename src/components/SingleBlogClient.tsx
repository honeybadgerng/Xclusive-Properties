"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw"; // To render raw HTML
import { Typography } from "@mui/material";

type Blog = {
  title: string;
  content: string;
  image?: string;
};

export default function SingleBlogClient({ blog }: { blog: Blog }) {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {blog.title}
      </Typography>
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full object-cover rounded mb-6"
          style={{ maxHeight: "500px" }}
        />
      )}
      <Typography
        component="div"
        className="text-black-600 leading-relaxed text-justify"
        style={{ wordBreak: "break-word" }}
      >
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]} // Enable raw HTML rendering
          components={{
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
          }}
        >
          {blog.content}
        </ReactMarkdown>
      </Typography>
    </div>
  );
}
