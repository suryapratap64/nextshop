import { connectDB } from "@/lib/db";
import { Product } from "@/lib/products";
import RecommendedProducts from "@/components/RecommendedProducts";

// Server Component
export default async function RecommendationsPage() {
  await connectDB();

  // Fetch recommended products (in a real app, this would use user preferences/history)
  const products = await Product.aggregate([
    { $sample: { size: 6 } }, // Randomly select 6 products for demo
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        price: 1,
        slug: 1,
        category: 1,
      },
    },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Recommended for You
      </h1>

      {/* Pass server data to client component */}
      <RecommendedProducts initialProducts={products} />
    </div>
  );
}
