"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface ProcessedData {
  numbers: number[];
  alphabets: string[];
  highest_lowercase_alphabet: string[];
}

export default function JsonProcessor() {
  const [jsonInput, setJsonInput] = useState(
    '{ "data": ["M", "1", "334", "4", "B", "a", "c", "z"] }'
  );
  const [processedData, setProcessedData] = useState<ProcessedData | null>(
    null
  );
  const [selectedFilter, setSelectedFilter] = useState<string>("numbers");

  const processJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const numbers: number[] = [];
      const alphabets: string[] = [];
      let highestLowercase = "a";

      parsed.data.forEach((item: string | number) => {
        if (typeof item === "number" || !isNaN(Number(item))) {
          numbers.push(Number(item));
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

      setProcessedData({
        numbers,
        alphabets,
        highest_lowercase_alphabet: [highestLowercase],
      });
    } catch (error) {
      console.error("Invalid JSON input", error);
      setProcessedData(null);
    }
  };

  const getFilteredResponse = () => {
    if (!processedData) return null;
    switch (selectedFilter) {
      case "numbers":
        return `Numbers: ${processedData.numbers.join(", ")}`;
      case "alphabets":
        return `Alphabets: ${processedData.alphabets.join(", ")}`;
      case "highest_lowercase":
        return `Highest Lowercase Alphabet: ${processedData.highest_lowercase_alphabet[0]}`;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>JSON Processor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="jsonInput">API Input</Label>
            <Input
              id="jsonInput"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='{"data":["A","1","B","2"]}'
            />
          </div>
          <Button onClick={processJson} className="w-full">
            Submit
          </Button>
          {processedData && (
            <div className="space-y-2">
              <Label htmlFor="filter">Multi Filter</Label>
              <Select onValueChange={setSelectedFilter} value={selectedFilter}>
                <SelectTrigger id="filter">
                  <SelectValue placeholder="Select filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="numbers">Numbers</SelectItem>
                  <SelectItem value="alphabets">Alphabets</SelectItem>
                  <SelectItem value="highest_lowercase">
                    Highest Lowercase Alphabet
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {processedData && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Filtered Response</h3>
              <p>{getFilteredResponse()}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
