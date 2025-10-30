"use client";

import { IProductResponse } from "@/types/product";

type ProductTableProps = {
  initialProducts: IProductResponse[];
};

export default function ProductTable({ initialProducts }: ProductTableProps) {
  return (
    <div className="overflow-x-auto mt-8">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-xs uppercase bg-gray-900">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Inventory</th>
          </tr>
        </thead>
        <tbody>
          {initialProducts.map((product) => (
            <tr
              key={product._id}
              className="border-b bg-gray-950 border-gray-800"
            >
              <td className="px-6 py-4">{product.name}</td>
              <td className="px-6 py-4">${product.price.toFixed(2)}</td>
              <td className="px-6 py-4">{product.inventory}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
