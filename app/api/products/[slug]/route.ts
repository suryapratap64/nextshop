import { connectDB } from "@/lib/db";
import { Product } from "@/lib/products";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: NextRequest, context: Context) {
  const { slug } = await context.params;
  await connectDB();
  const product = await Product.findOne({ slug });
  if (!product)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(product, { status: 200 });
}
