API Endpoints

    POST https://json-processor-koushik.vercel.app/api/bfhl
        Description: Brief description of the endpoint.
        Request Body:

        json

{
  "data": ["item1", "item2"],
  "file_b64": "base64encodedstring"
}

Response:

json

{
  "is_success": true,
  "numbers": [1, 2],
  "alphabets": ["A", "B"],
  "highest_lowercase_alphabet": ["z"]
}

GET https://json-processor-koushik.vercel.app/api/bfhl
{
  "operation_code": 1
}

STATUS: 201
