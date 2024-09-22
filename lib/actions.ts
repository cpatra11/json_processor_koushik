"use server";

import { inputSchema, responseSchema } from "./schema";

export async function processInput(input: unknown) {
  const parsedInput = inputSchema.parse(input);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/process`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsedInput),
    }
  );

  const data = await response.json();
  return responseSchema.parse(data);
}
