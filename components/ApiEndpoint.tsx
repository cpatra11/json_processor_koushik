import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ApiEndpoint() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>API Documentation</CardTitle>
        <CardDescription>
          How to access and use the BFHL API endpoint
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="post" className="w-full">
          <TabsList>
            <TabsTrigger value="post">POST</TabsTrigger>
            <TabsTrigger value="get">GET</TabsTrigger>
          </TabsList>
          <TabsContent value="post">
            <Card>
              <CardHeader>
                <CardTitle>POST /api/bfhl</CardTitle>
                <CardDescription>
                  Process data and file information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold">Request Body</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  {`{
  "data": ["M", "1", "334", "4", "B", "Z", "a"],
  "file_b64": "BASE_64_STRING"
}`}
                </pre>
                <p>
                  <strong>data:</strong> Array of strings or numbers
                </p>
                <p>
                  <strong>file_b64:</strong> (Optional) Base64 encoded string of
                  a file
                </p>

                <h3 className="text-lg font-semibold mt-6">Response</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  {`{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "numbers": ["1", "334", "4"],
  "alphabets": ["M", "B", "Z", "a"],
  "highest_lowercase_alphabet": ["a"],
  "file_valid": true,
  "file_mime_type": "image/png",
  "file_size_kb": 400
}`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="get">
            <Card>
              <CardHeader>
                <CardTitle>GET /api/bfhl</CardTitle>
                <CardDescription>Retrieve operation code</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold">Response</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  {`{
  "operation_code": 1
}`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
