"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./AddProductPage.module.css";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-") // Replace spaces and non-alphanumeric characters with "-"
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing dashes
}

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [slug, setSlug] = useState("");
  const [images, setImages] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [tags, setTags] = useState("");
  const router = useRouter();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setSlug(generateSlug(newName)); // Automatically generate slug
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const product = {
      name,
      price: Number(price),
      slug,
      images: images.split(","), // Split by comma to create an array
      videoUrl,
      category,
      subCategory,
      description,
      stock: Number(stock),
      brand,
      tags: tags.split(","), // Tags as an array
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (res.ok) {
      alert("Product added successfully");
      router.push("/admin"); // Redirect to admin dashboard
    } else {
      alert("Failed to add product");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Add New Product</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            Product Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className={styles.input}
            placeholder="Product Name"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="price" className={styles.label}>
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={styles.input}
            placeholder="Price"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="slug" className={styles.label}>
            Slug (for SEO)
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)} // Allow manual edits
            className={styles.input}
            placeholder="Slug"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="images" className={styles.label}>
            Images (comma-separated URLs)
          </label>
          <input
            type="text"
            id="images"
            value={images}
            onChange={(e) => setImages(e.target.value)}
            className={styles.input}
            placeholder="Images"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="videoUrl" className={styles.label}>
            Video URL (optional)
          </label>
          <input
            type="text"
            id="videoUrl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className={styles.input}
            placeholder="Video URL"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="category" className={styles.label}>
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.input}
            placeholder="Category"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="subCategory" className={styles.label}>
            Subcategory (optional)
          </label>
          <input
            type="text"
            id="subCategory"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className={styles.input}
            placeholder="Subcategory"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
            placeholder="Description"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="stock" className={styles.label}>
            Stock
          </label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className={styles.input}
            placeholder="Stock"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="brand" className={styles.label}>
            Brand (optional)
          </label>
          <input
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className={styles.input}
            placeholder="Brand"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="tags" className={styles.label}>
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className={styles.input}
            placeholder="Tags"
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Add Product
        </button>
      </form>
    </div>
  );
}
