import { Product } from "@/lib/products";
import { connectDB } from "@/lib/db";

export const revalidate = 60; // ISR - update every 60 seconds

export async function generateStaticParams() {
  await connectDB();
  const products = await Product.find().select("slug").lean();
  return products.map((p: any) => ({ slug: p.slug }));
}

export default async function ProductDetail({ params }: { params: { slug: string } }) {
  await connectDB();
  const product = await Product.findOne({ slug: params.slug }).lean();

  if (!product) return <div>Product not found</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p>{product.description}</p>
      <p className="font-bold">${product.price}</p>
    </div>
  );
}
