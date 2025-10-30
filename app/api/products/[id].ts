import { connectDB } from "@/lib/db";
import { Product } from "@/lib/products";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const key = request.headers.get("key");
  if (key !== process.env.ADMIN_KEY)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const { id } = params;
  const product = await Product.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(product, { status: 200 });
}
