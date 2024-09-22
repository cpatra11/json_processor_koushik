import { useState } from "react";

interface FilteredResponseProps {
  response: ResponseType;
}

type FilterOption = "alphabets" | "numbers" | "highest_lowercase_alphabet";

export function FilteredResponse({ response }: FilteredResponseProps) {
  const [filter, setFilter] = useState<FilterOption[]>([]);

  const handleFilterChange = (value: string) => {
    setFilter(value.split(",") as FilterOption[]);
  };

  const filteredData = filter.reduce((acc, key) => {
    if (response[key]) {
      acc[key] = response[key];
    }
    return acc;
  }, {} as Partial<ResponseType>);

  return (
    <div className="space-y-4">
      <Select onValueChange={handleFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="alphabets,numbers">Alphabets & Numbers</SelectItem>
          <SelectItem value="alphabets">Alphabets</SelectItem>
          <SelectItem value="numbers">Numbers</SelectItem>
          <SelectItem value="highest_lowercase_alphabet">
            Highest Lowercase Alphabet
          </SelectItem>
        </SelectContent>
      </Select>
      <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
        {JSON.stringify(filteredData, null, 2)}
      </pre>
    </div>
  );
}
