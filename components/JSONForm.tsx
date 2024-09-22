"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { inputSchema, InputType } from "@/lib/schema";

interface JsonFormProps {
  onSubmit: (data: InputType) => void;
}

export function JsonForm({ onSubmit }: JsonFormProps) {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<InputType>({
    resolver: zodResolver(inputSchema),
    defaultValues: { data: [], file_b64: "" },
  });

  const handleSubmit = (values: InputType) => {
    try {
      // Parse the 'data' input from JSON
      const parsedData = JSON.parse(values.data as unknown as string);

      if (Array.isArray(parsedData)) {
        onSubmit({ data: parsedData, file_b64: values.file_b64 });
        setError(null);
      } else {
        setError("Invalid JSON format: 'data' should be an array.");
      }
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
                <Textarea
                  placeholder='[ "M", "1", "334", "4", "B" ]' // Adjust the placeholder to be an array
                  value={JSON.stringify(field.value)} // Convert array to string for display
                  onChange={(e) => field.onChange(e.target.value)} // Capture the string input
                />
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
