"use client";
import { useState } from "react";

interface ProductFormProps {
  onUpdate: () => void;
}

export default function ProductForm({ onUpdate }: ProductFormProps) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    category: "",
    inventory: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Generate slug if not provided
      const dataToSend = {
        ...form,
        price: Number(form.price),
        inventory: Number(form.inventory),
        slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          key: process.env.NEXT_PUBLIC_ADMIN_KEY || "secret123",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await res.json();

      if (res.ok) {
        setForm({
          name: "",
          slug: "",
          description: "",
          price: "",
          category: "",
          inventory: "",
        });
        onUpdate();
      } else {
        setError(data.error || "Failed to add product");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 bg-gray-950 text-white p-6 rounded-xl shadow-lg border border-gray-700"
    >
      <h2 className="text-xl font-semibold mb-4 text-white">
        Add / Update Product
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="p-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <input
          type="text"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="Unique Slug"
          required
          className="p-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="p-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <input
          type="number"
          name="inventory"
          value={form.inventory}
          onChange={handleChange}
          placeholder="Inventory"
          required
          className="p-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="p-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition col-span-2"
        />
      </div>

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Product Description"
        required
        rows={4}
        className="p-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full mt-4 resize-none"
      />

      <button
        type="submit"
        className="mt-5 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-medium transition shadow-md hover:shadow-lg"
      >
        Save Product
      </button>
    </form>
  );
}
