"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, setProduct] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/products/${params.id}`);
      const data = await res.json();
      setProduct(data.data);
    }
    fetchProduct();
  }, [params.id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/products/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (res.ok) {
      alert("Product updated successfully");
      router.push("/admin");
    } else {
      alert("Failed to update product");
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
        />
        <input
          type="number"
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: Number(e.target.value) })
          }
          required
        />
        <input
          type="text"
          value={product.slug}
          onChange={(e) => setProduct({ ...product, slug: e.target.value })}
          required
        />
        <input
          type="text"
          value={product.images.join(",")}
          onChange={(e) =>
            setProduct({ ...product, images: e.target.value.split(",") })
          }
          required
        />
        <input
          type="text"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          required
        />
        <textarea
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          required
        />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}
