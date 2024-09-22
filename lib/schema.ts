import { z } from "zod";

export const inputSchema = z.object({
  data: z.array(z.union([z.string(), z.number()])),
  file_b64: z.string().optional(),
});

export const responseSchema = z.object({
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

export type InputType = z.infer<typeof inputSchema>;
export type ResponseType = z.infer<typeof responseSchema>;
