"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "./EditPropertyPage.module.css"; // Already created
import PropertyForm from "@/components/PropertyForm"; // Optional: extract the form for reuse

export default function EditPropertyPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const [propertyData, setPropertyData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/properties/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setPropertyData(data);
      } catch (err) {
        console.error("Failed to load property:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleUpdate = async (updatedData: any, images: File[]) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(updatedData));
      images.forEach((image) => formData.append("images", image));

      const token = localStorage.getItem("token");

      const res = await fetch(`/api/properties/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        alert("Update failed: " + err.error);
        return;
      }

      alert("Property updated successfully!");
      router.push("/admin");
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong.");
    }
  };

  if (loading) return <p>Loading property...</p>;
  if (!propertyData) return <p>Property not found.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Edit Property</h1>
      <PropertyForm
        mode="edit"
        initialData={propertyData}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
