"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inputSchema, InputType } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface JsonFormProps {
  onSubmit: (data: InputType) => void;
}

export function JsonForm({ onSubmit }: JsonFormProps) {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<InputType>({
    resolver: zodResolver(inputSchema),
    defaultValues: { data: "", file_b64: "" },
  });

  const handleSubmit = (values: InputType) => {
    try {
      const parsedData = JSON.parse(values.data);
      if (!Array.isArray(parsedData)) {
        throw new Error("Input must be an array");
      }
      onSubmit({ data: values.data, file_b64: values.file_b64 });
      setError(null);
    } catch (err) {
      setError("Invalid JSON input");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="data"
          render={({ field }) => (
            <FormItem>
              <FormLabel>JSON Input</FormLabel>
              <FormControl>
                <Textarea placeholder='["A", "1", "B", "2"]' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </Form>
  );
}
