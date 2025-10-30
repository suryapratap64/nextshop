import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  price: Number,
  category: String,
  inventory: Number,
  lastUpdated: String,
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
