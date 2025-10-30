import { Product } from "@/lib/products";
import { connectDB } from "@/lib/db";
import ProductTable from "@/components/ProductTable";


export const dynamic = "force-dynamic"; // SSR

export default async function Dashboard() {
  await connectDB();
  const products = await Product.find().lean();
  
  // Serialize the products properly
  const serializedProducts = products.map(product => {
    // Convert Mongoose document to plain object
    const plainProduct = JSON.parse(JSON.stringify(product));
    return {
      _id: plainProduct._id,
      name: plainProduct.name,
      slug: plainProduct.slug,
      description: plainProduct.description,
      price: plainProduct.price,
      category: plainProduct.category,
      inventory: plainProduct.inventory,
      lastUpdated: plainProduct.lastUpdated || new Date().toISOString()
    };
  });

  const lowStock = serializedProducts.filter((p) => p.inventory < 5).length;
  const outOfStock = serializedProducts.filter((p) => p.inventory === 0).length;

  return (
    <div className="max-w-4xl bg-gray-950/ rounded-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Inventory Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-950 border border-gray-700 rounded p-4">
          <p className="text-sm text-gray-400">Total Products</p>
          <p className="text-2xl font-bold text-white mt-1">{products.length}</p>
        </div>
        
        <div className="bg-gray-950 border border-gray-700 rounded p-4">
          <p className="text-sm text-gray-400">Low Stock</p>
          <p className="text-2xl font-bold text-orange-400 mt-1">{lowStock}</p>
        </div>
        
        <div className="bg-gray-950 border border-gray-700 rounded p-4">
          <p className="text-sm text-gray-400">Out of Stock</p>
          <p className="text-2xl font-bold text-red-400 mt-1">{outOfStock}</p>
        </div>
      </div>
      
   
      <ProductTable initialProducts={serializedProducts} />
    </div>
  );
}