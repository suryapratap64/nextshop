import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/lib/products";
import { connectDB } from "@/lib/db";

export const revalidate = false; // Static Site Generation

export default async function Home() {
  await connectDB();
  const products = await Product.find().lean();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Catalog</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </main>
  );
}
