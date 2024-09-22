import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const inputSchema = z.object({
  data: z.array(z.union([z.string(), z.number()])),
  file_b64: z.string().optional(),
});

const responseSchema = z.object({
  is_success: z.boolean(),
  user_id: z.string(),
  email: z.string().email(),
  roll_number: z.string(),
  numbers: z.array(z.number()),
  alphabets: z.array(z.string()),
  highest_lowercase_alphabet: z.array(z.string()),
  file_valid: z.boolean(),
  file_mime_type: z.string().optional(),
  file_size_kb: z.number().optional(),
});

export async function GET() {
  return NextResponse.json({ operation_code: 1 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = inputSchema.parse(body);

    const numbers: number[] = [];
    const alphabets: string[] = [];
    let highestLowercase = "a";

    input.data.forEach((item) => {
      if (typeof item === "number") {
        numbers.push(item);
      } else if (typeof item === "string") {
        alphabets.push(item);
        if (
          item.length === 1 &&
          item >= "a" &&
          item <= "z" &&
          item > highestLowercase
        ) {
          highestLowercase = item;
        }
      }
    });

    let fileValid = false;
    let fileMimeType;
    let fileSizeKb;

    if (input.file_b64) {
      const [, mimeType, base64Data] =
        input.file_b64.match(/^data:(.+);base64,(.+)$/) || [];
      if (mimeType && base64Data) {
        fileValid = true;
        fileMimeType = mimeType;
        fileSizeKb = Math.ceil((base64Data.length * 3) / 4 / 1024);
      }
    }

    const response = responseSchema.parse({
      is_success: true,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      numbers,
      alphabets,
      highest_lowercase_alphabet: [highestLowercase],
      file_valid: fileValid,
      file_mime_type: fileMimeType,
      file_size_kb: fileSizeKb,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { is_success: false, error: "Invalid input" },
      { status: 400 }
    );
  }
}
