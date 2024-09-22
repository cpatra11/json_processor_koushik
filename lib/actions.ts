"use server";

import { inputSchema, responseSchema } from "./schema";

export async function processInput(input: unknown) {
  // Validate and parse input using the schema
  const parsedInput = inputSchema.parse(input);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/bhfl`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedInput),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return responseSchema.parse(data); // Validate the response against the schema
  } catch (error) {
    console.error("Error processing input:", error);
    throw error; // Rethrow or handle the error appropriately
  }
}
