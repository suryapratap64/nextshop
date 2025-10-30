import { Document } from "mongoose";

// Base product interface without MongoDB specific fields
export interface IProductBase {
  name: string;
  slug: string;
  description: string;
  price: number;
  category?: string;
  inventory: number;
  lastUpdated: Date;
}

// Interface for product document in MongoDB
export interface IProductDocument extends IProductBase, Document {
  _id: string;
}

// Interface for product response from API
export interface IProductResponse extends Omit<IProductBase, "lastUpdated"> {
  _id: string;
  lastUpdated: string;
}

// Interface for creating a new product
export type CreateProductInput = Omit<IProductBase, "lastUpdated" | "slug">;

// Interface for updating a product
export type UpdateProductInput = Partial<
  Omit<IProductBase, "lastUpdated" | "slug">
>;
