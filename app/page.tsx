import { FilteredProducts } from "@/components/FilteredProducts";
import { Product } from "@/lib/products";
import { connectDB } from "@/lib/db";

// TypeScript interface for a product
export interface ProductType {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category?: string;
  inventory?: number;
  lastUpdated?: string;
}

// Disable automatic revalidation
export const revalidate = false;

export default async function Home() {
  await connectDB();
  const productsData = await Product.find().lean();

  // Safely convert all Mongoose documents to plain JS objects
  const products: ProductType[] = productsData.map((product: any) => ({
    _id: product._id.toString(),
    name: String(product.name),
    slug: String(product.slug),
    description: String(product.description),
    price: Number(product.price),
    category: product.category ? String(product.category) : undefined,
    inventory: product.inventory ? Number(product.inventory) : 0,
    lastUpdated: product.lastUpdated
      ? String(product.lastUpdated)
      : undefined,
  }));

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-blue-900 via-indigo-800 to-gray-900 shadow-lg mb-10">
        <h1 className="text-4xl font-bold text-white mb-3 tracking-wide">
          Explore Our Product Catalog
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Discover high-quality products at the best prices. Fast, fresh, and
          dynamically rendered using Next.js SSG.
        </p>
      </section>

      {/* Filtered Products */}
      <FilteredProducts initialProducts={products} />
    </main>
  );
}
