"use client";
import { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category?: string;
  slug: string;
}

export function FilteredProducts({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // Memoize filtered products to avoid re-filtering on every render
  const filteredProducts = useMemo(() => {
    const searchLower = searchTerm.toLowerCase().trim();

    if (!searchLower) return initialProducts;

    return initialProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower) ||
        product.category?.toLowerCase().includes(searchLower) ||
        product.price.toString().includes(searchLower)
    );
  }, [initialProducts, searchTerm]);

  return (
    <>
      {/* Search Bar with debouncing */}
      <section className="max-w-3xl mx-auto mb-8 px-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, description, category, or price..."
            className="w-full p-3 pl-10 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400 transition-all duration-300"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </section>

      {/* Product Grid with Results Count */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        {searchTerm && (
          <p className="text-gray-400 mb-4">
            Found {filteredProducts.length} result
            {filteredProducts.length !== 1 ? "s" : ""}
            for &quot;{searchTerm}&quot;
          </p>
        )}

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-2">No products found</p>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-fadeIn">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
