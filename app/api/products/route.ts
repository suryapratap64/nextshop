import { connectDB } from "@/lib/db";
import { Product } from "@/lib/products";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const products = await Product.find();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  await connectDB();

  const key = request.headers.get("key");
  if (key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const product = await Product.create(body);
  return NextResponse.json(product, { status: 201 });
}
