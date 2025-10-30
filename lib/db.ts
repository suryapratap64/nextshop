import mongoose from "mongoose";

// Define the cached mongoose type
type CachedMongoose = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongoose: CachedMongoose | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI)
  throw new Error("Please define the MONGODB_URI in .env.local");

let cached: CachedMongoose = global.mongoose || { conn: null, promise: null };
if (!global.mongoose) global.mongoose = cached;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export const connectDB = async (): Promise<typeof mongoose> => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
