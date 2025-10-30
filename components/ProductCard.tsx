"use client";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: {
    _id?: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    category?: string;
    inventory?: number;
  };
}

export const ProductCard: React.FC<{ product: ProductCardProps["product"] }> = ({
  product,
}) => {

  const imgSrc = "/image.png";

  return (
    <div className="group relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-600 hover:shadow-blue-500/30 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 ease-in-out">
      {/* Product Image */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      
      <div className="p-5 relative z-10">
        <h2 className="text-lg font-semibold group-hover:text-blue-400 transition-colors duration-200 mb-2 truncate">
          {product.name}
        </h2>

        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-3">
          <p className="text-green-400 font-bold text-lg">
            ₹{product.price.toLocaleString()}
          </p>

        
          <Link
            href={`/products/${product.slug}`}
            className="relative z-20 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer"
          >
            View
          </Link>
        </div>
      </div>

      
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-20 bg-blue-500 blur-2xl transition-all duration-300"></div>
    </div>
  );
};
