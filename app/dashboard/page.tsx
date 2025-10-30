import { Product } from "@/lib/products";
import { connectDB } from "@/lib/db";

export const dynamic = "force-dynamic"; // SSR

export default async function Dashboard() {
  await connectDB();
  const products = await Product.find().lean();
  const lowStock = products.filter((p) => p.inventory < 5).length;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Inventory Dashboard</h1>
      <p>Total Products: {products.length}</p>
      <p>Low Stock Items: {lowStock}</p>
    </div>
  );
}
