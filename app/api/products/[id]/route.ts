import { connectDB } from "@/lib/db";
import { Product } from "@/lib/products";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    // Check admin key
    const key = request.headers.get("key");
    if (key !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get request body
    const body = await request.json();

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: "Invalid product ID format" },
        { status: 400 }
      );
    }

    // Find and update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      new mongoose.Types.ObjectId(params.id),
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Serialize the updated product
    const serializedProduct = {
      _id: updatedProduct._id.toString(),
      name: updatedProduct.name,
      slug: updatedProduct.slug,
      description: updatedProduct.description,
      price: updatedProduct.price,
      category: updatedProduct.category,
      inventory: updatedProduct.inventory,
      lastUpdated: updatedProduct.lastUpdated
        ? new Date(updatedProduct.lastUpdated).toISOString()
        : new Date().toISOString(),
    };

    return NextResponse.json(serializedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
