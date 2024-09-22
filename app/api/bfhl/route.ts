import { NextRequest, NextResponse } from "next/server";
import {
  inputSchema,
  responseSchema,
  InputType,
  ResponseType,
} from "@/lib/schema"; // Import the schemas and types

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, file_b64 }: InputType = inputSchema.parse(body);

    // Separate numbers and alphabets from data
    const numbers = data
      .filter((item) => typeof item === "number" || !isNaN(Number(item)))
      .map(String);

    const alphabets = data.filter(
      (item): item is string => typeof item === "string" && isNaN(Number(item))
    );

    // Determine the highest lowercase alphabet
    const highest_lowercase_alphabet = [
      alphabets
        .filter((char) => char.length === 1 && char >= "a" && char <= "z")
        .sort((a, b) => b.localeCompare(a))[0] || "",
    ].filter(Boolean);

    // Handle base64 file validation
    let file_valid = false;
    let file_mime_type;
    let file_size_kb;

    if (file_b64) {
      const [, mimeType, base64Data] =
        file_b64.match(/^data:(.+);base64,(.+)$/) || [];
      if (mimeType && base64Data) {
        file_valid = true;
        file_mime_type = mimeType;
        file_size_kb = Math.ceil((base64Data.length * 3) / 4 / 1024);
      }
    }

    // Build and validate the response
    const response: ResponseType = responseSchema.parse({
      is_success: true,
      user_id: process.env.USERID, // Consider using environment variables
      email: process.env.EMAIL, // Consider using environment variables
      roll_number: process.env.ROLL_NO, // Consider using environment variables
      numbers,
      alphabets,
      highest_lowercase_alphabet,
      file_valid,
      file_mime_type,
      file_size_kb,
    });

    console.log("Response:", response); // Log successful responses
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { is_success: false, error: "Invalid input" },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ operation_code: 1 });
}
