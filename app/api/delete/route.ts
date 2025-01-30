import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Code } from "@/lib/codeModel";

export async function DELETE(req: Request) {
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

    // Delete the code from the database
    const result = await Code.deleteOne({ key });

    // Check if any document was deleted
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Code not found" }, { status: 404 });
    }

    // Return success message after deletion
    return NextResponse.json({ message: "Code deleted successfully" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}