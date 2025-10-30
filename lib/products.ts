import mongoose, { Model } from "mongoose";
import { IProductDocument } from "@/types/product";

const productSchema = new mongoose.Schema<IProductDocument>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String },
  inventory: { type: Number, default: 0, min: 0 },
  lastUpdated: { type: Date, default: Date.now },
});

// Auto-generate slug from name if not provided
productSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

export const Product: Model<IProductDocument> =
  mongoose.models.Product ||
  mongoose.model<IProductDocument>("Product", productSchema);
