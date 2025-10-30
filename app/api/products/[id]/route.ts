import { connectDB } from "@/lib/db";
import { Product } from "@/lib/products";
import { NextRequest, NextResponse } from "next/server";
import {
  IProductDocument,
  IProductResponse,
  UpdateProductInput,
} from "@/types/product";
import mongoose from "mongoose";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    // Check admin key
    const key = request.headers.get("key");
    if (!key || key !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get request body and validate
    const body: UpdateProductInput = await request.json();

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: "Invalid product ID format" },
        { status: 400 }
      );
    }

    // Find and update the product
    const updatedProduct: IProductDocument | null =
      await Product.findByIdAndUpdate(
        new mongoose.Types.ObjectId(params.id),
        { $set: body },
        { new: true, runValidators: true }
      );

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Transform to response format
    const response: IProductResponse = {
      _id: updatedProduct._id.toString(),
      name: updatedProduct.name,
      slug: updatedProduct.slug,
      description: updatedProduct.description,
      price: updatedProduct.price,
      category: updatedProduct.category,
      inventory: updatedProduct.inventory,
      lastUpdated: updatedProduct.lastUpdated.toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
