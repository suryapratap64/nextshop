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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: { key: process.env.NEXT_PUBLIC_ADMIN_KEY || "secret123" },
    });
    fetchProducts();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Admin Panel</h1>
      
      <ProductForm onUpdate={fetchProducts} />
      
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Product List</h2>
        
        {products.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No products found. Add your first product above.</p>
        ) : (
          <div className="space-y-3">
            {products.map((p: any) => (
              <div 
                key={p._id} 
                className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex items-center justify-between hover:bg-gray-750 transition"
              >
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{p.name}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm">
                    <span className="text-gray-400">Price: <span className="text-white font-medium">${p.price}</span></span>
                    <span className="text-gray-400">Stock: <span className="text-white font-medium">{p.inventory}</span></span>
                    {p.category && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        {p.category}
                      </span>
                    )}
                  </div>
                </div>
             
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}