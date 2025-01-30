import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Code } from "@/lib/codeModel";

export async function POST(req: Request) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the request body
    const { key, code } = await req.json();

    // Validate inputs
    if (!key || !code) {
      return NextResponse.json({ error: "Key and code are required" }, { status: 400 });
    }

    // Find the code document and update or insert if not found
    const result = await Code.findOneAndUpdate(
      { key }, // Search by the 'key'
      { code }, // Update the 'code' field
      { upsert: true, new: true } // If not found, create a new document
    );

    // If result is null, something went wrong
    if (!result) {
      return NextResponse.json({ error: "Failed to save code" }, { status: 500 });
    }

    // Return a success response
    return NextResponse.json({ message: "Code saved successfully" });

  } catch (error) {
    // Catch any errors and return a response
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}