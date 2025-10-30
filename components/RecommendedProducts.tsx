"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  slug: string;
  category?: string;
}

export default function RecommendedProducts({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      setWishlist(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save wishlist to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify([...wishlist]));
  }, [wishlist]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {initialProducts.map((product) => (
        <div
          key={product._id}
          className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500 transition-all duration-300"
        >
          <div className="p-6">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-semibold text-white mb-2">
                {product.name}
              </h3>
              <button
                onClick={() => toggleWishlist(product._id)}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  wishlist.has(product._id)
                    ? "text-red-500 hover:text-red-600"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={wishlist.has(product._id) ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
            </div>

            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-green-400">
                ₹{product.price.toLocaleString()}
              </span>
              <Link
                href={`/products/${product.slug}`}
                className="text-blue-500 hover:text-blue-400 text-sm font-medium"
              >
                View Details →
              </Link>
            </div>

            {product.category && (
              <span className="inline-block mt-3 px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                {product.category}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
