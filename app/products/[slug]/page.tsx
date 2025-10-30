import { Product } from "@/lib/products";
import { connectDB } from "@/lib/db";
import Image from "next/image";

export const revalidate = 60; // ISR - update every 60 seconds

export async function generateStaticParams() {
  await connectDB();
  const products = await Product.find().select("slug").lean();
  return products.map((p: any) => ({ slug: p.slug }));
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connectDB();
  const { slug } = await params;
  const product = await Product.findOne({ slug }).lean();

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-12">
          <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
          <p className="text-gray-400">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const stockStatus = product.inventory === 0 
    ? { text: "Out of Stock", color: "text-red-400" }
    : product.inventory < 5
    ? { text: "Low Stock", color: "text-orange-400" }
    : { text: "In Stock", color: "text-green-400" };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gray-950 border border-gray-800 rounded-lg overflow-hidden">
        {/* Product Image */}
        <div className="bg-gray-800 h-96 relative overflow-hidden">
          <Image
            src={"/image.png"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="p-6">
          {/* Category Badge */}
          {product.category && (
            <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full mb-3">
              {product.category}
            </span>
          )}

          {/* Product Name */}
          <h1 className="text-3xl font-bold text-white mb-3">{product.name}</h1>

          {/* Price and Stock */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-800">
            <div>
              <p className="text-3xl font-bold text-white">${product.price}</p>
              <p className="text-sm text-gray-400 mt-1">Free shipping on orders over $50</p>
            </div>
            <div className="text-right">
              <p className={`text-sm font-semibold ${stockStatus.color}`}>
                {stockStatus.text}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {product.inventory} units available
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
            <p className="text-gray-300 leading-relaxed">{product.description}</p>
          </div>



          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Product ID</p>
                <p className="text-white font-medium">{product.slug}</p>
              </div>
              {product.lastUpdated && (
                <div>
                  <p className="text-gray-400">Last Updated</p>
                  <p className="text-white font-medium">
                    {new Date(product.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}