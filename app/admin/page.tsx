"use client";
import { useState, useEffect } from "react";
import ProductForm from "@/components/ProductForm";

export default function AdminPage() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    setProducts(await res.json());
  };

  useEffect(() => { fetchProducts(); }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
      <ProductForm onUpdate={fetchProducts} />
      <ul>
        {products.map((p: any) => (
          <li key={p._id}>{p.name} - ${p.price}</li>
        ))}
      </ul>
    </div>
  );
}
