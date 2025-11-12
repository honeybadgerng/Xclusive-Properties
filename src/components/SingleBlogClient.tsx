"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Link from "next/link";
import { Typography } from "@mui/material";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { toast } from "sonner";

type Blog = {
  title: string;
  content: string;
  image?: string;
  category?: string;
  date?: string;
  readTime?: string;
  author?: string;
  excerpt?: string;
};

export default function SingleBlogClient({ blog }: { blog: Blog }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <article className="min-h-screen bg-background">
      {/* Hero Section */}
      {blog.image && (
        <section className="relative h-[400px] md:h-[500px] overflow-hidden bg-muted">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </section>
      )}

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 -mt-32 relative z-10">
        <div className="bg-card rounded-lg shadow-lg p-6 md:p-12">
          {/* Header */}
          <div className="mb-8">
            <Link href="/blogs">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
              </Button>
            </Link>

            {blog.category && (
              <Badge variant="secondary" className="mb-4">
                {blog.category}
              </Badge>
            )}

            <Typography variant="h3" fontWeight="bold" gutterBottom>
              {blog.title}
            </Typography>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
              {blog.author && (
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {blog.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <span className="font-medium text-foreground">
                    {blog.author}
                  </span>
                </div>
              )}
              <Separator orientation="vertical" className="h-6" />
              {blog.date && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              )}
              <Separator orientation="vertical" className="h-6" />
              {blog.readTime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {blog.readTime}
                </div>
              )}
              <Separator orientation="vertical" className="h-6" />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none dark:prose-invert"
            style={{ color: "inherit" }}
          >
            <div className="[&_p]:text-inherit [&_span]:text-inherit [&_div]:text-inherit [&_strong]:text-inherit [&_em]:text-inherit [&_a]:text-primary [&_a:hover]:text-primary/80 [&_*]:!text-inherit">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-semibold mt-8 mb-4">
                      {children}
                    </h2>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 leading-relaxed text-justify">
                      {children}
                    </p>
                  ),
                }}
              >
                {blog.content}
              </ReactMarkdown>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Footer */}
          <div className="flex items-center justify-between">
            <Link href="/blogs">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Articles
              </Button>
            </Link>
            <Button onClick={handleShare} variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share Article
            </Button>
          </div>
        </div>
      </div>

      <div className="h-16" />
    </article>
  );
}
