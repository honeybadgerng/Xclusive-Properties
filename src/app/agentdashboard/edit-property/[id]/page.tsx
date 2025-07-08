"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PropertyForm from "@/components/PropertyForm";
import styles from "./EditPropertyPage.module.css";
export default function EditPropertyPage() {
  const params = useParams();
  const id = params
    ? Array.isArray(params.id)
      ? params.id[0]
      : params.id
    : undefined;
  const router = useRouter();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${id}`);
        const data = await res.json();
        setProperty(data);
      } catch (err) {
        console.error("Failed to fetch property", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleUpdate = async (formData: any, images: File[]) => {
    try {
      const body = new FormData();
      console.log(formData);
      console.log(JSON.stringify(formData));
      body.append("data", JSON.stringify(formData));
      images.forEach((img) => body.append("images", img));

      const token = localStorage.getItem("token");
      const res = await fetch(`/api/properties/${id}`, {
        method: "PUT",
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        alert(`Update failed: ${error.error}`);
        return;
      }

      alert("Property updated!");
      router.push("/admin");
    } catch (err) {
      console.error("Update error", err);
      alert("An unexpected error occurred.");
    }
  };

  if (loading) return <div>Loading property...</div>;
  if (!property) return <div>Property not found.</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Edit Property</h1>
      <PropertyForm
        mode="edit"
        initialData={property}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
