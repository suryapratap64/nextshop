"use client";

import { useState } from "react";
import { IProduct } from "@/types/product";

type ProductTableProps = {
  initialProducts: IProduct[];
};

export default function ProductTable({ initialProducts }: ProductTableProps) {
  const [products, setProducts] = useState(initialProducts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<IProduct>>({});

  const handleEdit = (product: IProduct) => {
    setEditingId(product._id);
    setEditForm(product);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "inventory" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          key:process.env.ADMIN_KEY || "",
        },
        body: JSON.stringify(editForm),
      });

      if (!res.ok) throw new Error("Failed to update product");

      const updatedProduct = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? updatedProduct : p))
      );
      setEditingId(null);
      setEditForm({});
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  return (
    <div className="overflow-x-auto mt-8">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-xs uppercase bg-gray-900">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Inventory</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product._id}
              className="border-b bg-gray-950 border-gray-800"
            >
              <td className="px-6 py-4">
                {editingId === product._id ? (
                  <input
                    type="text"
                    name="name"
                    value={editForm.name || ""}
                    onChange={handleChange}
                    className="bg-gray-800 text-white rounded px-2 py-1 w-full"
                  />
                ) : (
                  product.name
                )}
              </td>
              <td className="px-6 py-4">
                {editingId === product._id ? (
                  <input
                    type="number"
                    name="price"
                    value={editForm.price || 0}
                    onChange={handleChange}
                    className="bg-gray-800 text-white rounded px-2 py-1 w-24"
                  />
                ) : (
                  `$${product.price.toFixed(2)}`
                )}
              </td>
              <td className="px-6 py-4">
                {editingId === product._id ? (
                  <input
                    type="number"
                    name="inventory"
                    value={editForm.inventory || 0}
                    onChange={handleChange}
                    className="bg-gray-800 text-white rounded px-2 py-1 w-24"
                  />
                ) : (
                  product.inventory
                )}
              </td>
              <td className="px-6 py-4">
                {editingId === product._id ? (
                  <div className="space-x-2">
                    <button
                      onClick={() => handleSubmit(product._id)}
                      className="text-green-500 hover:text-green-400"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-red-500 hover:text-red-400"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-500 hover:text-blue-400"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
