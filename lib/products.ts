import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
