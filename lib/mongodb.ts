import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) throw new Error("Please define the MONGODB_URI environment variable.");

// Define a proper global type
interface MongooseGlobal {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// Use const instead of let
const globalWithMongoose = global as unknown as { mongoose?: MongooseGlobal };

const cached: MongooseGlobal = globalWithMongoose.mongoose || { conn: null, promise: null };

export async function connectToDatabase(): Promise<mongoose.Connection> {
  if (cached.conn) return cached.conn;
  
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { dbName: "codeshare" }).then((m) => m.connection);
  }
  
  cached.conn = await cached.promise;
  globalWithMongoose.mongoose = cached; // Store the cached connection globally
  
  return cached.conn;
}
