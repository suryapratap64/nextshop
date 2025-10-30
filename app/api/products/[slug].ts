import { connectDB } from "@/lib/db";
import { Product } from "@/lib/products";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  await connectDB();
  const { slug } = params;
  const product = await Product.findOne({ slug });
  if (!product)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  
  return NextResponse.json(product, { status: 200 });
}
