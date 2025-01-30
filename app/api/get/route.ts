import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Code } from "@/lib/codeModel";

export async function GET(req: Request) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Use the URL constructor to parse the request URL
    const url = new URL(req.url);

    // Extract 'key' from query parameters
    const key = url.searchParams.get("key");

    // Validate that the 'key' is provided
    if (!key) {
      return NextResponse.json({ error: "Key is required" }, { status: 400 });
    }

    // Find the code in the database by key
    const codeData = await Code.findOne({ key });

    // If no code is found, return a 404 error
    if (!codeData) {
      return NextResponse.json({ error: "Code not found" }, { status: 404 });
    }

    // Return the code found
    return NextResponse.json({ code: codeData.code });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}