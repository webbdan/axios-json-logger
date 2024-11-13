# axios-json-logger

`axios-json-logger` is a simple utility package that adds JSON logging to any Axios instance. It intercepts requests, responses, and errors to log them in a readable, pretty-printed JSON format. This package is useful for debugging HTTP requests and responses, especially in complex applications.

## Installation

Install `axios-json-logger` using npm:

```bash
npm install axios-json-logger
```

## Usage

To use `axios-json-logger`, import the `addAxiosJsonLogger` function and apply it to an Axios instance.

### Example

```typescript
import axios from 'axios';
import { addAxiosJsonLogger } from 'axios-json-logger';

// Create an Axios instance with your custom configuration
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
});

// Add JSON logging to the Axios instance
addAxiosJsonLogger(axiosInstance);

// Make requests using the Axios instance
axiosInstance.get('/posts')
  .then(response => console.log('Data fetched successfully:', response.data))
  .catch(error => console.error('Error fetching data:', error));
```

### Expected Output

Each request, response, and error will be logged in the console in JSON format, as shown below.

#### Request Log
```json
Request: {
  "url": "/posts",
  "method": "get",
  "headers": { ... },
  "data": null,
  "params": {}
}
```

#### Response Log
```json
Response: {
  "url": "/posts",
  "status": 200,
  "statusText": "OK",
  "headers": { ... },
  "data": [
    {
      "userId": 1,
      "id": 1,
      "title": "Sample Post",
      "body": "Sample body content"
    },
    ...
  ]
}
```

#### Error Log (if any error occurs)
```json
Response Error: {
  "message": "Request failed with status code 404",
  "response": {
    "url": "/invalid-endpoint",
    "status": 404,
    "statusText": "Not Found",
    "headers": { ... },
    "data": { ... }
  }
}
```

## API

### `addAxiosJsonLogger(axiosInstance: AxiosInstance): AxiosInstance`

Adds JSON logging interceptors for requests, responses, and errors to the provided Axios instance.

- **Parameters**:
  - `axiosInstance` (`AxiosInstance`): An instance of Axios to which JSON logging will be added.

- **Returns**:
  - The same `axiosInstance` with logging interceptors attached.

## TypeScript Support

This package is fully written in TypeScript, so type definitions are included out of the box.

## License

MIT
```

This README provides instructions on installing, using, and understanding the output of the `axios-json-logger` package, along with example usage to demonstrate its functionality.