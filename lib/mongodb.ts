import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

// Define a proper global type for caching the connection
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// Ensure global caching for hot-reloading in development
const globalWithMongoose = global as unknown as { mongoose?: MongooseCache };

// Use `const` instead of `let` to avoid ESLint error
const cached: MongooseCache = globalWithMongoose.mongoose || { conn: null, promise: null };

export async function connectToDatabase(): Promise<mongoose.Connection> {
  if (cached.conn) return cached.conn; // Return existing connection if available

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { dbName: "codeshare" }).then((m) => m.connection);
  }

  cached.conn = await cached.promise;
  globalWithMongoose.mongoose = cached; // Store the cached connection globally

  return cached.conn;
}
